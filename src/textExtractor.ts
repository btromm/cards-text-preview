import { App, TFile } from 'obsidian';

export function stripFrontmatter(content: string): string {
	return content.replace(/^---\n[\s\S]*?\n---\n/, '');
}

export function stripMarkdown(text: string): string {
	let result = text;
	result = result.replace(/```[\s\S]*?```/g, '');
	result = result.replace(/`[^`]+`/g, '');
	result = result.replace(/^#{1,6}\s+/gm, '');
	result = result.replace(/(\*\*|__)(.*?)\1/g, '$2');
	result = result.replace(/(\*|_)(.*?)\1/g, '$2');
	result = result.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
	result = result.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_: string, link: string, text: string) => text || link);
	result = result.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
	result = result.replace(/^>\s+/gm, '');
	result = result.replace(/^[*\-+]\s+/gm, '');
	result = result.replace(/^\d+\.\s+/gm, '');
	result = result.replace(/^[*\-_]{3,}$/gm, '');
	result = result.replace(/<[^>]+>/g, '');
	return result;
}

export async function getPlainTextPreview(
	app: App,
	file: TFile,
	maxLines: number
): Promise<string> {
	try {
		const content = await app.vault.cachedRead(file);
		let text = stripFrontmatter(content);
		text = stripMarkdown(text);
		text = text.replace(/\s+/g, ' ').trim();

		if (!text) {
			return '';
		}

		// Get enough characters for the requested lines (~80 chars per line)
		const maxChars = maxLines * 80;
		if (text.length > maxChars) {
			return text.substring(0, maxChars).trim() + '...';
		}

		return text;
	} catch (error) {
		console.error(`Failed to read file ${file.path}:`, error);
		return '';
	}
}
