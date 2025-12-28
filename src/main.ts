import { Plugin } from 'obsidian';
import { CardsWithPreviewView } from './CardsWithPreviewView';

/**
 * Cards with Preview Plugin for Obsidian.
 * Adds a custom Bases view that displays notes as cards with text body previews.
 */
export default class CardsTextPreviewPlugin extends Plugin {
	async onload() {
		// Register the Cards with Preview view
		this.registerBasesView('cards-with-preview', {
			name: 'Cards with Preview',
			icon: 'file-text',
			factory: (controller, containerEl) => {
				return new CardsWithPreviewView(controller, containerEl);
			},
			options: () => [
				{
					type: 'property',
					key: 'image-property',
					displayName: 'Image Property',
					placeholder: 'Choose a property for card images...'
				},
				{
					type: 'slider',
					key: 'card-size',
					displayName: 'Card Size',
					min: 100,
					max: 400,
					step: 25,
					default: 200
				},
				{
					type: 'slider',
					key: 'preview-length',
					displayName: 'Preview Lines',
					min: 1,
					max: 10,
					step: 1,
					default: 3
				},
				{
					type: 'slider',
					key: 'font-size',
					displayName: 'Preview Font Size',
					min: 10,
					max: 18,
					step: 1,
					default: 13
				},
				{
					type: 'dropdown',
					key: 'cover-fit',
					displayName: 'Cover Fit',
					default: 'cover',
					options: {
						'cover': 'Cover',
						'contain': 'Contain'
					} as Record<string, string>
				},
				{
					type: 'dropdown',
					key: 'cover-ratio',
					displayName: 'Cover Ratio',
					default: '3/2',
					options: {
						'1/1': 'Square (1:1)',
						'4/3': 'Standard (4:3)',
						'3/2': 'Photo (3:2)',
						'16/9': 'Wide (16:9)',
						'2/1': 'Banner (2:1)'
					} as Record<string, string>
				}
			]
		});
	}

	onunload() {
		// Cleanup handled automatically by Obsidian
	}
}
