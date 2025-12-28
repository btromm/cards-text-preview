import { BasesView, BasesEntry, TFile, QueryController, NullValue, BasesPropertyId } from 'obsidian';
import { getPlainTextPreview } from './textExtractor';

export class CardsWithPreviewView extends BasesView {
	private containerEl: HTMLElement;
	private previewCache: Map<string, string> = new Map();
	type = 'cards-with-preview';

	constructor(controller: QueryController, parentEl: HTMLElement) {
		super(controller);
		this.containerEl = parentEl.createDiv({ cls: 'cards-preview-grid' });
	}

	async onDataUpdated(): Promise<void> {
		this.previewCache.clear();
		await this.renderCards();
	}

	private async renderCards(): Promise<void> {
		const previewLines = Number(this.config.get('preview-length')) || 3;
		const coverFit = (this.config.get('cover-fit') as string) || 'cover';
		const coverRatio = (this.config.get('cover-ratio') as string) || '3/2';
		const cardSize = Number(this.config.get('card-size')) || 200;
		const fontSize = Number(this.config.get('font-size')) || 13;

		// Use built-in properties from the base's column picker, excluding image property and file name
		const imagePropertyId = this.config.getAsPropertyId('image-property');
		const propertyIds: BasesPropertyId[] = this.config.getOrder()
			.filter((id: BasesPropertyId) => {
				// Exclude image property and file name (already shown as title)
				if (id === imagePropertyId) return false;
				if (id === 'note.name' || id.endsWith('.name')) return false;
				return true;
			});

		this.containerEl.empty();

		// Set card size via CSS variable
		this.containerEl.style.setProperty('--card-min-width', `${cardSize}px`);
		this.containerEl.style.setProperty('--preview-font-size', `${fontSize}px`);

		if (this.data.data.length === 0) {
			this.containerEl.createDiv({ cls: 'cards-preview-empty', text: 'No notes to display' });
			return;
		}

		for (const entry of this.data.data) {
			await this.createCard(entry, previewLines, coverFit, coverRatio, propertyIds, imagePropertyId);
		}
	}

	private async createCard(entry: BasesEntry, previewLines: number, coverFit: string, coverRatio: string, propertyIds: BasesPropertyId[], imagePropertyId: BasesPropertyId | null): Promise<void> {
		const card = this.containerEl.createDiv({ cls: 'cards-preview-card' });

		let hasImage = false;

		if (imagePropertyId) {
			const imageValue = entry.getValue(imagePropertyId);

			if (imageValue && !(imageValue instanceof NullValue)) {
				let imagePath = imageValue.toString().trim();

				// Handle wiki-link format [[path]]
				if (imagePath.startsWith('[[') && imagePath.endsWith(']]')) {
					imagePath = imagePath.slice(2, -2);
				}

				if (imagePath) {
					// Try to find the file
					let imageFile = this.app.vault.getAbstractFileByPath(imagePath);

					// If not found, try with metadata cache
					if (!imageFile) {
						const linkedFile = this.app.metadataCache.getFirstLinkpathDest(imagePath, entry.file.path);
						if (linkedFile) {
							imageFile = linkedFile;
						}
					}

					if (imageFile && imageFile instanceof TFile) {
						const resourcePath = this.app.vault.getResourcePath(imageFile);

						const cover = card.createDiv({ cls: 'cards-preview-cover' });
						cover.style.backgroundImage = `url("${resourcePath}")`;
						cover.style.backgroundSize = coverFit;
						cover.style.aspectRatio = coverRatio;
						hasImage = true;
					}
				}
			}
		}

		// Title
		card.createDiv({ cls: 'cards-preview-title', text: entry.file.basename });

		// Text preview (only if no image)
		if (!hasImage) {
			const preview = await this.getPreview(entry.file, previewLines);
			if (preview) {
				const previewEl = card.createDiv({ cls: 'cards-preview-text' });
				previewEl.setText(preview);
				previewEl.style.webkitLineClamp = String(previewLines);
			}
		}

		// Additional properties
		if (propertyIds.length > 0) {
			const propsContainer = card.createDiv({ cls: 'cards-preview-properties' });
			for (const propId of propertyIds) {
				const propValue = entry.getValue(propId);
				if (propValue && !(propValue instanceof NullValue)) {
					const propEl = propsContainer.createDiv({ cls: 'cards-preview-property' });
					const labelEl = propEl.createSpan({ cls: 'cards-preview-property-label' });
					// Extract property name from the ID (format: "note.propertyname")
					const propName = propId.includes('.') ? propId.split('.').pop() || propId : propId;
					labelEl.setText(propName);
					const valueEl = propEl.createSpan({ cls: 'cards-preview-property-value' });
					this.renderPropertyValue(valueEl, propValue.toString(), entry.file.path);
				}
			}
		}

		// Click to open
		card.addEventListener('click', () => {
			this.app.workspace.getLeaf(false).openFile(entry.file);
		});
	}

	private renderPropertyValue(container: HTMLElement, value: string, sourcePath: string): void {
		// Parse wikilinks and render them as clickable links
		const wikiLinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
		let lastIndex = 0;
		let match;

		while ((match = wikiLinkRegex.exec(value)) !== null) {
			// Add text before the link
			if (match.index > lastIndex) {
				container.appendText(value.slice(lastIndex, match.index));
			}

			const linkPath = match[1] ?? '';
			const displayText = match[2] ?? linkPath;

			// Create clickable link
			const linkEl = container.createEl('a', {
				cls: 'internal-link',
				text: displayText
			});
			linkEl.setAttribute('data-href', linkPath);
			linkEl.addEventListener('click', (e) => {
				e.stopPropagation(); // Prevent card click
				const file = this.app.metadataCache.getFirstLinkpathDest(linkPath, sourcePath);
				if (file) {
					this.app.workspace.getLeaf(false).openFile(file);
				}
			});

			lastIndex = match.index + match[0].length;
		}

		// Add remaining text after last link
		if (lastIndex < value.length) {
			container.appendText(value.slice(lastIndex));
		}

		// If no wikilinks found, just set the text
		if (lastIndex === 0) {
			container.setText(value);
		}
	}

	private async getPreview(file: TFile, maxLines: number): Promise<string> {
		const key = `${file.path}:${maxLines}`;
		if (this.previewCache.has(key)) {
			return this.previewCache.get(key)!;
		}
		const preview = await getPlainTextPreview(this.app, file, maxLines);
		this.previewCache.set(key, preview);
		return preview;
	}
}
