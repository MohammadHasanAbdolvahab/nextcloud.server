# SEPEHR Theme for Nextcloud

A beautiful, modern Material Design theme for Nextcloud with RTL (Right-to-Left) support and Persian language optimization.

# SEPEHR Theme (اکو سیستم سپهر)

Comprehensive documentation for the SEPEHR Nextcloud theme. This file explains the theme structure, files, authors, color palette, tokens, JS API, installation steps, and troubleshooting notes.

## Table of Contents

- Overview
- Author & License
- Files & Directory Structure (full explanation)
- Design tokens & color palette
- Fonts and icons
- JavaScript API and behaviors
- How to enable and verify the theme
- Troubleshooting & common issues
- Changelog pointer

## Overview

SEPEHR is a Material Design-inspired theme for Nextcloud focused on Persian (Farsi) users with RTL layout, custom login experience, and unobtrusive footer branding. The theme was implemented to avoid invasive layout overrides: where possible we use CSS and JS injection to preserve Nextcloud core functionality (header, app menu).

## Author & License

- Author: MohammadHasanAbdolvahab (repository owner)
- Design / Implementation: SEPEHR theme contributors
- License: AGPL-3.0-or-later (see project root for full license files)

## Files & Directory Structure

This section documents every important file and folder inside `themes/sepehr/` and what it's responsible for.

- `defaults.php`
  - Purpose: Nextcloud theme descriptor and bootstrap. Sets theme title, short/long footer, icon paths and other metadata consumed by Nextcloud.
  - Important values: `getTitle()`, `getEntity()`, `getShortFooter()`, `getLongFooter()` — branding strings live here ("اکو سیستم سپهر" and footer text).

- `core/`
  - `css/`
    - `design-system.css` — Design tokens and CSS custom properties. Contains color variables, font stacks, spacing scales, and other tokens used across components.
    - `server.css` — Component and page-level styles. Includes overrides for Nextcloud classes, login page styles, responsive rules, and footer styling.
  - `js/`
    - `sepehr.js` — Main theme JavaScript. Responsibilities:
      - Initialize RTL and theme class on DOMContentLoaded
      - Inject small footer ("توان گرفته از مرکز بهشتی نژاد") without overriding layout
      - Provide Material-like enhancements (ripples, floating labels, checkbox wrapping)
      - Provide small fixes for table/header overlap and file selection UI (non-invasive)
      - Expose a tiny `window.SepehrTheme` API (showNotification, version)
  - `img/`
    - `logo.svg` — Recommended location for the theme logo. If missing, add a suitably sized SVG (recommended 120×120 viewBox)

- `core/templates/`
  - `login.php` — Login page override. Localized Persian strings, Material-style form markup, password show/hide support, and forgot-password link.
    - Note: Login template can be safely overridden if it includes Nextcloud's expected hooks for CSRF tokens and CSP nonces.

- `l10n/`
  - `fa.json` — Persian translations (keyed strings used by templates/JS)

- `CHANGELOG.md` — Release notes and history for the theme.

- `DESIGN_MOCKUP.md` — Design mockup and implementation notes derived from the original visual design.

- `README.md` — This file.

## Design tokens & Color Palette

The theme centralizes colors and tokens within `core/css/design-system.css`. Key tokens (variable names may vary slightly in the file):

- Primary: --sepehr-primary (hex: #00695c) — main brand teal
- Secondary: --sepehr-secondary (hex: #4db6ac) — light/secondary teal
- Accent: --sepehr-accent (optional) — for small highlights
- Surface / background tokens: --md-surface, --md-surface-variant, --md-on-surface
- Error: --sepehr-error (hex: #c62828)
- Success: --sepehr-success (hex: #2e7d32)

Suggested color plate (for reference):

- #004D40 (dark teal / brand deep)
- #00695C (primary) — used for buttons and key accents
- #26A69A (bright teal)
- #4DB6AC (secondary)
- #FAFAFA (page background)
- #FFFFFF (panels)
- #212121 / #424242 (text tones)
- #C62828 (errors)

Spacing and typography tokens include root font-size, scale steps (e.g., --space-1..--space-5), and elevation shadows for Material-like surfaces.

## Fonts and Icons

- Fonts: The theme uses Vazirmatn for Persian typography. Files should be placed at `core/fonts/Vazirmatn-*.woff2` for different weights (e.g., 300, 400, 700, 800).
- Icons: Prefer Nextcloud's built-in icon set. If custom icons are needed, place them in `core/img/` and reference from CSS.

## JavaScript API and Behaviors

`core/js/sepehr.js` exposes a small client API on `window.SepehrTheme`:

- `window.SepehrTheme.showNotification(message, type)` — shows a transient notification (types: 'info', 'success', 'warning', 'error')
- `window.SepehrTheme.version` — theme script version string

Other behaviors implemented:

- Ripple effect on buttons (visual only)
- Floating label handling for inputs
- Checkbox wrapping for consistent Material look
- Footer injection (skips login/public pages to avoid layout conflicts)
- Defensive checks: no DOM mutations on missing elements; avoids double-inserting elements

## How to enable and verify the theme

1. Place the `sepehr` folder under your Nextcloud `themes/` directory.

2. Enable the theme using `occ` (recommended):

```bash
# From Nextcloud root
php occ maintenance:theme:set sepehr
php occ maintenance:repair
```

Or set directly in `config/config.php`:

```php
'theme' => 'sepehr',
```

3. Clear caches and reload:

  - Clear Nextcloud caches with `php occ maintenance:repair` (or restart PHP-FPM if using FastCGI).
  - Clear browser cache.

4. Verify:

  - Open Nextcloud in a browser, confirm header, app menu and login branding appear.
  - Open Developer Tools → Console — look for `SEPEHR Material Design Theme initialized` and `SEPEHR footer created successfully` messages.
  - Check Fonts & CSS: network tab should show `Vazirmatn-*.woff2` requests and `sepehr.js` and `server.css` loaded.

## Troubleshooting & Common Issues

- Navbar / App menu missing: this usually occurs when overriding `layout.user.php` incompletely. Solution: remove custom `layout.user.php` or ensure it contains Nextcloud's required placeholders. We removed our layout override to avoid this.

- Footer not visible: ensure `core/js/sepehr.js` is loaded and no JS errors exist. The footer is skipped on login/public pages by design.

- Colors look off: make sure your browser didn't cache older CSS; hard refresh or clear cache.

- Fonts not loading: ensure `core/fonts/` files exist and correct path in `design-system.css`.

- Permission issues: ensure files in the theme directory are readable by the webserver user.

## Development notes

- Prefer CSS/JS injection for layout-level changes instead of full template overrides unless you replicate Nextcloud's placeholders.
- Keep changes small and test with a clean Nextcloud instance to catch missing hooks.

## Changelog & Release Notes

See `CHANGELOG.md` for a summary of releases and notable changes.

---

If you'd like, I can also:

- Generate a complete list of token names and values from `core/css/design-system.css`.
- Produce exported color swatches and a downloadable preview HTML for the login page.
- Add screenshots and usage examples to this README.

## Localization example: `l10n/fa.json` (how to add and use translations)

The theme uses a simple JSON file for Persian translations. Example file `themes/sepehr/l10n/fa.json`:

```json
{
  "Login.Title": "ورود به حساب کاربری",
  "Login.Subtitle": "لطفاً اطلاعات خود را وارد کنید",
  "Login.RecoveryEmailSent": "لینک بازیابی رمز عبور به ایمیل شما ارسال شد.",
  "Login.EnterUsername": "لطفاً نام کاربری خود را وارد کنید",
  "Login.EnterPassword": "لطفاً رمز عبور خود را وارد کنید",
  "Footer.Copyright": "توان گرفته از مرکز بهشتی نژاد",
  "Password.Toggle.Show": "نمایش رمز",
  "Password.Toggle.Hide": "مخفی کردن رمز"
}
```

How to add a new translation row
1. Open `themes/sepehr/l10n/fa.json` in an editor.
2. Add a new key/value pair, for example:

```json
  "Login.PasswordTooShort": "رمز عبور خیلی کوتاه است"
```

3. Ensure the file remains valid JSON (commas between items, UTF-8 encoding). Save.
4. Clear caches (Nextcloud and browser) or run `php occ maintenance:repair` so Nextcloud reloads language files.

Using translations in PHP templates

```php
// inside a template or PHP file
$l = \OC::$server->getL10N('sepehr');
echo $l->t('Login.RecoveryEmailSent');
// with placeholders:
echo $l->t('Files.deleted', [$count]); // if translation contains "%s"
```

Using translations in JavaScript (client-side)

Typical Nextcloud helper (depends on NC version):

```javascript
const l10n = OC && OC.L10N ? OC.L10N.get('sepehr') : null;
if (l10n) {
  const msg = l10n.t('Login.RecoveryEmailSent');
  console.log(msg);
}
```

If you prefer server-side injection (safer across NC versions), render translated strings into the template using PHP and reference them from JS.

Example (render into template):

```php
<script nonce="<?php p($nonce) ?>">
  window.SepehrTranslations = {
    recoverySent: <?php p(json_encode($l->t('Login.RecoveryEmailSent'))); ?>
  };
</script>
```

Then in JS:

```javascript
if (window.SepehrTranslations) {
  showMessage(window.SepehrTranslations.recoverySent, 'success');
}
```

Notes
- Always keep `fa.json` valid JSON and UTF-8 encoded.
- Use clear key naming (namespace by feature) so keys are easy to find.
- If you need plurals or complex pluralization rules, consider how Nextcloud's L10N handles plural forms and follow its conventions; simple use-cases work with `%s` placeholders.


