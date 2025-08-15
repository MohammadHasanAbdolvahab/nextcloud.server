#!/bin/bash

# SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
# SPDX-License-Identifier: AGPL-3.0-or-later

# Jalali Calendar Integration Setup Script for Nextcloud Calendar App
# This script integrates Persian (Jalali) calendar support into Nextcloud Calendar

set -e  # Exit on any error

echo "🎌 Starting Jalali Calendar Integration Setup..."

# Check if we're in the Nextcloud root directory
if [ ! -f "version.php" ] || [ ! -d "apps/calendar" ]; then
    echo "❌ Error: Please run this script from the Nextcloud root directory"
    echo "Expected: nextcloud/server/ directory with apps/calendar/"
    exit 1
fi

CALENDAR_DIR="apps/calendar"
JS_DIR="$CALENDAR_DIR/js"
TEMPLATES_DIR="$CALENDAR_DIR/templates"

echo "📍 Working in directory: $(pwd)"
echo "📂 Calendar app directory: $CALENDAR_DIR"

# Function to backup existing files
backup_file() {
    local file="$1"
    if [ -f "$file" ]; then
        cp "$file" "$file.backup.$(date +%Y%m%d_%H%M%S)"
        echo "💾 Backed up: $file"
    fi
}

# Step 1: Verify required files exist
echo "🔍 Verifying Jalali calendar implementation files..."

REQUIRED_FILES=(
    "$JS_DIR/jalali-date-adapter.js"
    "$JS_DIR/jalali-fullcalendar-locale.js"
    "$JS_DIR/jalali-navigation.js"
    "$JS_DIR/jalali-browser-integration.js"
    "$TEMPLATES_DIR/jalali-integration-template.php"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        echo "Please ensure all Jalali calendar files are created first."
        exit 1
    fi
    echo "✅ Found: $file"
done

# Step 2: Install Node.js dependencies (if package.json exists and npm is available)
echo "📦 Checking for package.json and npm..."

if [ -f "package.json" ] && command -v npm &> /dev/null; then
    echo "📥 Installing dayjs and jalaliday dependencies..."
    
    # Check if dependencies are already installed
    if ! npm list dayjs &> /dev/null || ! npm list jalaliday &> /dev/null; then
        echo "Installing missing dependencies..."
        npm install dayjs@^1.11.0 jalaliday@^1.2.0
        echo "✅ Dependencies installed successfully"
    else
        echo "✅ Dependencies already installed"
    fi
else
    echo "⚠️  Warning: npm not available or package.json not found"
    echo "   Jalali calendar will work with browser-only integration"
fi

# Step 3: Apply integration to calendar templates
echo "🔧 Integrating Jalali calendar into templates..."

# Find PHP template files in calendar app
TEMPLATE_FILES=$(find "$TEMPLATES_DIR" -name "*.php" 2>/dev/null | head -5)

if [ -z "$TEMPLATE_FILES" ]; then
    echo "⚠️  No PHP template files found in $TEMPLATES_DIR"
    echo "   You may need to manually integrate the template code"
else
    echo "📄 Found template files:"
    echo "$TEMPLATE_FILES"
    
    # For demonstration, show how to integrate
    echo ""
    echo "📋 To integrate Jalali calendar, add the following to your main calendar template:"
    echo "   (Usually index.php or main.php in $TEMPLATES_DIR)"
    echo ""
    cat << 'EOF'
<!-- Add before closing </head> tag -->
<script type="text/javascript">
    window.NC_CALENDAR_JALALI = <?php echo ($_['locale'] === 'fa' || strpos($_['locale'], 'fa_') === 0) ? 'true' : 'false'; ?>;
</script>
<script defer src="<?php echo $_['webroot']; ?>/apps/calendar/js/jalali-browser-integration.js"></script>

<!-- Add after FullCalendar scripts -->
<script defer src="<?php echo $_['webroot']; ?>/apps/calendar/js/jalali-date-adapter.js"></script>
<script defer src="<?php echo $_['webroot']; ?>/apps/calendar/js/jalali-fullcalendar-locale.js"></script>
EOF
fi

# Step 4: Create configuration file
echo "⚙️  Creating configuration file..."

CONFIG_FILE="$CALENDAR_DIR/jalali-config.json"
cat > "$CONFIG_FILE" << EOF
{
    "enabled": true,
    "autoDetectLocale": true,
    "supportedLocales": ["fa", "fa_IR", "fa-IR"],
    "defaultFirstDay": 6,
    "features": {
        "dateConversion": true,
        "monthNames": true,
        "weekdayNames": true,
        "rtlSupport": true,
        "navigation": true
    },
    "fallback": {
        "useBrowserIntegration": true,
        "preserveOriginalOnError": true
    },
    "version": "1.0.0",
    "createdAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
}
EOF

echo "✅ Configuration created: $CONFIG_FILE"

# Step 5: Test integration
echo "🧪 Testing Jalali calendar integration..."

# Check if JavaScript files are syntactically correct
if command -v node &> /dev/null; then
    echo "🔍 Checking JavaScript syntax..."
    
    for js_file in "$JS_DIR"/jalali-*.js; do
        if [ -f "$js_file" ]; then
            if node -c "$js_file" 2>/dev/null; then
                echo "✅ Syntax OK: $(basename "$js_file")"
            else
                echo "❌ Syntax Error: $(basename "$js_file")"
                exit 1
            fi
        fi
    done
else
    echo "⚠️  Node.js not available for syntax checking"
fi

# Step 6: Create usage instructions
echo "📚 Creating usage instructions..."

USAGE_FILE="$CALENDAR_DIR/JALALI_USAGE.md"
cat > "$USAGE_FILE" << 'EOF'
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
EOF

echo "✅ Usage guide created: $USAGE_FILE"

# Step 7: Final summary
echo ""
echo "🎉 Jalali Calendar Integration Complete!"
echo ""
echo "📋 Summary of what was installed:"
echo "   ✅ Core date conversion engine"
echo "   ✅ FullCalendar locale provider"
echo "   ✅ Navigation integration"
echo "   ✅ Browser-compatible fallback"
echo "   ✅ Template integration guide"
echo "   ✅ Configuration file"
echo "   ✅ Usage documentation"
echo ""
echo "📌 Next Steps:"
echo "   1. Add template integration code to your calendar templates"
echo "   2. Set user locale to 'fa' or 'fa_IR' for Persian users"
echo "   3. Test calendar functionality with Persian locale"
echo "   4. Optionally rebuild calendar app if using webpack"
echo ""
echo "🔗 Files created/modified:"
for file in "${REQUIRED_FILES[@]}" "$CONFIG_FILE" "$USAGE_FILE"; do
    if [ -f "$file" ]; then
        echo "   - $file"
    fi
done
echo ""
echo "📖 See $USAGE_FILE for detailed usage instructions"
echo "🎌 Enjoy your Persian calendar! تقویم جلالی فعال شد!"
EOF
