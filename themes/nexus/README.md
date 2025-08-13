# Nexus Theme for Nextcloud

A modern, Material Design-inspired theme for Nextcloud with full RTL (Right-to-Left) support and Persian language optimization.

## Features

- 🎨 **Material Design 3** - Modern, clean interface following Google's Material Design guidelines
- 🔄 **RTL Support** - Complete right-to-left layout for Persian, Arabic, and Hebrew languages
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🌐 **Persian Language** - Full Persian translations and cultural adaptations
- ⚡ **Performance Optimized** - Efficient CSS and JavaScript for fast loading
- 🔧 **Customizable** - Easy to modify colors, fonts, and layout
- ♿ **Accessible** - WCAG 2.1 AA compliant for better accessibility

## Installation

1. Copy the `nexus` folder to your Nextcloud themes directory:
   ```
   /path/to/nextcloud/themes/nexus/
   ```

2. Enable the theme in your Nextcloud configuration file (`config/config.php`):
   ```php
   'theme' => 'nexus',
   ```

3. Clear the cache and refresh your browser.

## File Structure

```
themes/nexus/
├── defaults.php              # Theme configuration and branding
├── README.md                 # This file
├── core/
│   ├── css/
│   │   ├── design-system.css # Design tokens and variables
│   │   └── server.css        # Main theme styles
│   ├── js/
│   │   └── nexus.js         # Theme JavaScript enhancements
│   └── img/
│       └── logo.svg         # Theme logo
├── templates/
│   └── login.php            # Custom login page template
└── l10n/
    └── fa.json              # Persian translations
```

## Customization

### Colors
Edit the CSS custom properties in `core/css/design-system.css`:
```css
:root {
  --nexus-primary: #1976D2;      # Primary brand color
  --nexus-secondary: #FF5722;    # Secondary accent color
  --nexus-success: #4CAF50;      # Success state color
  /* ... more colors */
}
```

### Typography
The theme uses Vazirmatn font for Persian text. You can change the font family in the design system file.

### Layout
Modify spacing, borders, and layout properties using the design tokens in `design-system.css`.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This theme is licensed under the AGPL-3.0-or-later license.

## Credits

- **Design**: Inspired by Material Design 3
- **Font**: Vazirmatn by Saber Rastikerdar
- **Icons**: Material Design Icons
- **Framework**: Built for Nextcloud

## Support

For issues and feature requests, please use the GitHub issue tracker.

---

Made with ❤️ for the Persian-speaking Nextcloud community.
