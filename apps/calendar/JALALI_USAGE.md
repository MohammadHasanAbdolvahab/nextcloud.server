# Jalali Calendar Usage Guide

## 🎌 Features Installed

- ✅ Persian (Jalali) date conversion
- ✅ Persian month names (فروردین, اردیبهشت, etc.)
- ✅ Saturday as first day of week
- ✅ RTL (Right-to-Left) support
- ✅ Persian weekday names
- ✅ Browser-compatible fallback

## 🚀 How to Use

### Automatic Activation
- Jalali calendar automatically activates for users with Persian locale (`fa`, `fa_IR`)
- Browser language detection is used as fallback

### Manual Activation
```javascript
// Enable Jalali calendar manually
window.JalaliCalendar.enable();

// Disable Jalali calendar
window.JalaliCalendar.disable();

// Check if enabled
console.log(window.JalaliCalendar.isEnabled());

// Format a date in Jalali
console.log(window.JalaliCalendar.formatDate(new Date()));
```

### User Preference
- Users can toggle Jalali calendar in their settings
- Preference is stored in browser localStorage
- Setting persists across sessions

## 🛠️ Configuration

Edit `jalali-config.json` to customize:
- Enable/disable features
- Set supported locales
- Configure fallback behavior

## 🔧 Troubleshooting

### Calendar doesn't switch to Jalali
1. Check browser console for errors
2. Verify locale is set to Persian (`fa`)
3. Ensure scripts loaded successfully

### Dates appear incorrect
1. Jalali conversion is approximate for browser-only mode
2. Install dayjs + jalaliday for accurate conversion
3. Check timezone settings

### RTL layout issues
1. Verify CSS is loading correctly
2. Check for conflicting styles
3. Browser compatibility (modern browsers recommended)

## 📞 Support

For issues or feature requests, check:
- Browser console for error messages
- Network tab for failed script loads
- Calendar app logs in Nextcloud admin panel
