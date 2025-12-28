# Cards with Preview - Obsidian Plugin

A custom Bases view for [Obsidian](https://obsidian.md) that displays notes as cards with text previews. Easily browse and find content in your vault with a visual card-based layout showing note titles, optional images, and configurable plain text excerpts from note bodies.

## Features

- 📇 **Card Grid Layout**: View your notes as cards in a responsive grid
- 📄 **Text Previews**: Display plain text excerpts from note bodies (50-1000 characters, configurable per-view)
- 🖼️ **Image Support**: Show images from note properties when an Image Property is configured
- ⚙️ **Per-View Configuration**: Each Bases view can have different preview settings
- 🎨 **Theme Compatible**: Automatically adapts to light and dark themes
- 📱 **Responsive**: Works on desktop and mobile devices

## Requirements

- Obsidian 1.10.0 or higher (required for Bases API)

## Installation

### Manual Installation

1. Download the latest release files from GitHub
2. Copy `main.js`, `manifest.json`, and `styles.css` to your vault's plugins folder:
   ```
   VaultFolder/.obsidian/plugins/cards-text-preview/
   ```
3. Reload Obsidian
4. Enable the plugin in Settings → Community plugins

## Usage

1. **Create or open a Base**: Go to a `.base` file in your vault (requires Bases core plugin)
2. **Switch to Cards with Preview view**: Click the view selector and choose "Cards with Preview"
3. **Configure options**: Use the view options toolbar to adjust:
   - **Image Property**: Select a property that contains image paths to display images on cards
   - **Preview Character Limit**: Set how many characters to show in text previews (50-1000)
4. **Click cards**: Click any card to open the note

## Configuration

### View Options

The plugin adds two configurable options to each Bases view:

#### Image Property
- **Type**: Property selector
- **Purpose**: Choose a note property that contains image file paths
- **Behavior**:
  - If configured and the note has a value for this property, the image will be displayed at the top of the card
  - If no image is available, the text preview will be shown instead
  - Both image and text preview can be displayed simultaneously

#### Preview Character Limit
- **Type**: Slider (50-1000 characters)
- **Default**: 200 characters
- **Purpose**: Control how much text to display from each note body
- **Behavior**: Text is truncated with "..." if it exceeds the limit

### What Gets Previewed

The text preview shows plain text from your note body:
- ✅ Markdown formatting is stripped (headers, bold, italic, links, etc.)
- ✅ Frontmatter is excluded
- ✅ Code blocks and inline code are removed
- ✅ Whitespace is normalized
- ✅ Empty notes show "[No content]"
- ✅ Read errors show "[Unable to load preview]"

## Development

### Building from Source

```bash
# Install dependencies
pnpm install

# Build for development (watch mode)
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint
```

### Project Structure

```
src/
├── main.ts                    # Plugin entry point and view registration
├── CardsWithPreviewView.ts    # Bases view implementation
├── textExtractor.ts           # Text extraction and markdown stripping
└── types.ts                   # TypeScript interfaces

styles.css                     # Card styling
manifest.json                  # Plugin metadata
```

## Troubleshooting

### Cards not showing
- Ensure you're using Obsidian 1.10.0 or higher
- Verify the Bases core plugin is enabled
- Check that you're viewing a `.base` file

### Images not displaying
- Confirm an "Image Property" is selected in view options
- Verify the property contains valid file paths to images in your vault
- Check that image files exist at the specified paths

### Text preview looks wrong
- Adjust the "Preview Character Limit" in view options
- Some complex markdown may not strip perfectly - this is expected
- Contact support if specific patterns cause issues

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the 0BSD License.

## What Makes This Plus Version Different?

This template includes additional tools and documentation to improve your development experience:

### AI-Assisted Development System

- **`AGENTS.md`** - Project-specific instructions for AI coding assistants
- **`.agents/` folder** - Comprehensive development guides, code patterns, and best practices
- Helps AI assistants understand your project structure and coding conventions
- Provides quick reference guides and common task examples

### Reference Materials System (`.ref` folder)

- **Symlinks to Obsidian repositories** - Easy access to API docs, sample code, and examples
- **Centralized storage** - All projects share the same reference repos (no duplication)
- **6 core Obsidian projects** - API definitions, documentation, sample plugins, ESLint rules
- **Project-specific references** - Add your own plugin/theme references as needed

### ESLint 9 with Obsidian Rules

- **Exact parity with Review Bot** - Uses the same `obsidianmd.configs.recommended` configuration
- **Automatic migration** - Upgrades from ESLint 8 to ESLint 9 automatically
- **Smart detection** - Handles `main.ts` in root or `src/` folder automatically
- **Catches common issues** - Command naming, style manipulation, deprecated APIs, and more

**See also:** [obsidian-sample-theme-plus](https://github.com/davidvkimball/obsidian-sample-theme-plus) - The companion theme template with similar enhancements.

## Recommended Tools and Plugins for Plugin Development

These tools can significantly improve your plugin development workflow:

### Hot Reload Plugins

<<<<<<< HEAD
**[Hot Reload](https://github.com/pjeby/hot-reload)** - Automatically reload your plugin when code changes. Dramatically speeds up development by eliminating manual reloads.

**[Hot Reload Mobile](https://github.com/shabegom/obsidian-hot-reload-mobile)** - Mobile-compatible version of Hot Reload for testing on mobile devices.

## Improve Code Quality with ESLint

[ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code.

- This project already has ESLint preconfigured, you can invoke a check by running `pnpm lint`
- Together with a custom ESLint [plugin](https://github.com/obsidianmd/eslint-plugin-obsidian) for Obsidian specific code guidelines
- A GitHub action is preconfigured to automatically lint every commit on all branches

## Quick Start

### For New Plugins (Using This as a Template)

1. **Use this template** - Click "Use this template" on GitHub or clone this repo
2. **Install dependencies**: `pnpm install`
3. **Optional: Setup reference materials** (recommended):
   - **Windows**: `scripts\setup-ref-links.bat`
   - **macOS/Linux**: `./scripts/setup-ref-links.sh`
4. **Optional: Setup ESLint** (recommended):
   ```bash
   node scripts/setup-eslint.mjs
   pnpm install
   pnpm lint
   ```
5. **Start developing**: `pnpm dev`

### For Existing Plugins (Upgrading to This System)

You can add these enhancements to your existing plugin:

1. **Copy these folders/files to your plugin**:
   - `AGENTS.md` → Your plugin root
   - `.agents/` folder → Your plugin root
   - `scripts/` folder → Your plugin root

2. **Setup reference materials**:
   - **Windows**: `scripts\setup-ref-links.bat`
   - **macOS/Linux**: `./scripts/setup-ref-links.sh`
   - This creates symlinks to Obsidian reference repos in `.ref/` folder

3. **Setup ESLint** (recommended):
   ```bash
   node scripts/setup-eslint.mjs
   pnpm install
   pnpm lint
   ```
   
   **What the setup script does automatically:**
   - Updates `package.json` with ESLint 9 dependencies and lint scripts
   - Creates/updates `eslint.config.mjs` (ESLint 9 flat config)
   - Updates `esbuild.config.mjs` (fixes builtinModules import, adds entry point detection, ensures output to root)
   - Creates `scripts/lint-wrapper.mjs` (adds helpful success messages)
   - Removes legacy `.eslintrc` files if present
   
   **Note:** The script will update your existing `esbuild.config.mjs` and `eslint.config.mjs` files, but it preserves your custom configuration where possible. Review the changes after running the script.
   
   **Important:** Don't copy `package.json` from this template - it contains template-specific values. The setup script will update your existing `package.json` with only the necessary ESLint dependencies and scripts.

## First Time Developing Plugins?

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)!
- Make a copy of this repo as a template with the "Use this template" button
- Clone your repo to a local development folder
- Install NodeJS (v16+), then run `pnpm install`
- Run `pnpm dev` to compile your plugin (builds to `main.js` in root)
- For releases, run `pnpm build` which creates `main.js` in root
- Reload Obsidian to load the new version of your plugin
- Enable plugin in settings window

## How to Use

### Basic Development

- Clone this repo
- Make sure your NodeJS is at least v16 (`node --version`)
- `pnpm install` to install dependencies (or `npm install` - it will automatically proxy to pnpm)
- **Development**: `pnpm dev` - Builds to `main.js` in root with watch mode
- **Production**: `pnpm build` - Builds to `main.js` in root (one-time build)

**Note**: This project uses pnpm, but `npm install`, `npm run build`, `npm run dev`, and `npm run lint` will also work for backwards compatibility. The `npm install` command automatically proxies to `pnpm install` via a preinstall hook.

### Using the AI System

- Read `AGENTS.md` for project-specific instructions
- Check `.agents/` folder for development guides
- See `.agents/quick-reference.md` for a one-page cheat sheet

### Using ESLint

- **Check for issues**: `pnpm lint` (shows helpful success message when passing)
- **Auto-fix issues**: `pnpm lint:fix`

The lint commands use `scripts/lint-wrapper.mjs` which adds helpful success messages. This file is automatically created/updated when you run `node scripts/setup-eslint.mjs`.

## Releasing New Releases

- Update your `manifest.json` with your new version number and minimum Obsidian version
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"`
- **Build for production**: Run `pnpm build`
  - Creates `main.js` in the root directory (compiled from TypeScript)
- Create new GitHub release using your new version number as the "Tag version" (no `v` prefix)
- **Upload these files** to the release:
  - `main.js` (from root)
  - `manifest.json` (from root)
  - `styles.css` (from root, if present)
- Publish the release

> **Tip:** You can simplify the version bump process by running `pnpm version patch`, `pnpm version minor` or `pnpm version major` after updating `minAppVersion` manually in `manifest.json`.


## Adding Your Plugin to the Community Plugin List

- Check the [plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)
- Publish an initial version
- Make sure you have a `README.md` file in the root of your repo
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin

## Manually Installing the Plugin

- Copy over `main.js`, `manifest.json`, and `styles.css` (if present) from the root directory to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`

## Funding URL

You can include funding URLs in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

Or for multiple URLs:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors"
    }
}
```

## Troubleshooting

### Upgrade Issues

If you're upgrading an existing plugin and encounter issues:

1. **ESLint errors after setup**: Run `pnpm install` to ensure all dependencies are installed
2. **Build errors**: Check that `esbuild.config.mjs` was updated correctly (the setup script should handle this automatically)
3. **Entry point not found**: The setup script adds entry point detection - verify `esbuild.config.mjs` has the detection logic for both `src/main.ts` and `main.ts`
4. **Package.json conflicts**: Don't copy `package.json` from the template - the setup script updates your existing one with only the necessary additions

### Common Issues

- **`.ref` folder is empty**: Run the setup script (`scripts\setup-ref-links.bat` or `.sh`)
- **Linting fails**: Make sure you ran `pnpm install` after running the ESLint setup script
- **Build fails**: Check that `esbuild.config.mjs` exists and has the correct entry point detection

## API Documentation

See https://docs.obsidian.md
