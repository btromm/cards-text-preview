import { TFile } from 'obsidian';

/**
 * Data structure for a single card in the Cards with Preview view.
 */
export interface CardData {
	/** The file associated with this card */
	file: TFile;
	/** Display title for the card */
	title: string;
	/** Frontmatter properties from the note */
	properties: Record<string, unknown>;
	/** Plain text preview of the note body */
	preview: string;
}

/**
 * Configuration options for the Cards with Preview view.
 */
export interface ViewOptions {
	/** Maximum number of characters to display in the preview (50-1000) */
	previewLength: number;
}
