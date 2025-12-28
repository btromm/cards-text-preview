import { BasesView, BasesEntry, TFile, QueryController, NullValue } from 'obsidian';
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
		const cardSize = (this.config.get('card-size') as string) || 'medium';

		this.containerEl.empty();

		// Set card size class on container
		this.containerEl.removeClass('size-small', 'size-medium', 'size-large');
		this.containerEl.addClass(`size-${cardSize}`);

		if (this.data.data.length === 0) {
			this.containerEl.createDiv({ cls: 'cards-preview-empty', text: 'No notes to display' });
			return;
		}

		for (const entry of this.data.data) {
			await this.createCard(entry, previewLines, coverFit, coverRatio);
		}
	}

	private async createCard(entry: BasesEntry, previewLines: number, coverFit: string, coverRatio: string): Promise<void> {
		const card = this.containerEl.createDiv({ cls: 'cards-preview-card' });

		// Check for image
		const imagePropertyId = this.config.getAsPropertyId('image-property');
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

		// Click to open
		card.addEventListener('click', () => {
			this.app.workspace.getLeaf(false).openFile(entry.file);
		});
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
