# Cards with Preview - Obsidian Plugin

A custom Bases view for [Obsidian](https://obsidian.md) that displays notes as cards with text previews and clickable wikilinks.

## Features

- **Card Grid Layout**: View your notes as cards in a responsive grid
- **Text Previews**: Display plain text excerpts from note bodies
- **Image Support**: Show images from note properties as card covers
- **Property Display**: Show additional properties with clickable wikilinks
- **Configurable Sizing**: Adjust card size (100-400px) and font size (10-18px)
- **Theme Compatible**: Adapts to light and dark themes

## Requirements

- Obsidian 1.10.0 or higher (requires Bases API)

## Installation

### Via BRAT

1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) if you haven't already
2. Open BRAT settings → Add Beta plugin
3. Enter: `btromm/cards-text-preview`

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/btromm/cards-text-preview/releases)
2. Copy to your vault: `VaultFolder/.obsidian/plugins/cards-text-preview/`
3. Reload Obsidian and enable the plugin

## Usage

1. Open a `.base` file in your vault
2. Click the view selector and choose "Cards with Preview"
3. Configure options in the view toolbar:
   - **Image Property**: Property containing image paths for card covers
   - **Card Size**: Width of cards (100-400px slider)
   - **Preview Lines**: Number of text lines to show (1-10)
   - **Preview Font Size**: Text size for previews (10-18px)
   - **Cover Fit**: How images fill the cover area (Cover/Contain)
   - **Cover Ratio**: Aspect ratio for image covers

Properties configured in the Bases column picker will display below the card content, with wikilinks rendered as clickable internal links.

## License

0BSD
