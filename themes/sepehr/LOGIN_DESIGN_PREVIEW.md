# 🎨 SEPEHR Login Page - Visual Design Reference

## What You Should See After Applying the Theme

### 📱 Overall Appearance
```
┌─────────────────────────────────────────────────────────────┐
│                    FULL SCREEN BACKGROUND                  │
│        Beautiful Teal Gradient (#00695c to #4db6ac)       │
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │             WHITE LOGIN BOX                     │     │
│    │          (Centered, Rounded Corners)            │     │
│    │                                                 │     │
│    │                سپهر کلود                        │     │
│    │        (Large Teal Brand Title)                 │     │
│    │                                                 │     │
│    │            ورود به حساب کاربری                   │     │
│    │          (Login Form Title)                     │     │
│    │                                                 │     │
│    │    ________________                             │     │
│    │    نام کاربری       |  (RTL Input)              │     │
│    │    ================                             │     │
│    │                                                 │     │
│    │    ________________                             │     │
│    │    رمز عبور         |  (RTL Input)              │     │
│    │    ================                             │     │
│    │                                                 │     │
│    │    ☑ مرا به خاطر بسپار     فراموشی رمز عبور      │     │
│    │                                                 │     │
│    │    ┌─────────────────────────────────────────┐   │     │
│    │    │         ورود به سپهر                    │   │     │
│    │    │      (Teal Button with Hover)          │   │     │
│    │    └─────────────────────────────────────────┘   │     │
│    │                                                 │     │
│    │              ابری امن و هوشمند                   │     │
│    │            (Subtitle at bottom)                │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 🎨 Visual Elements

#### Colors
- **Background**: Beautiful teal gradient (`linear-gradient(135deg, #00695c 0%, #4db6ac 50%, #26a69a 100%)`)
- **Login Box**: Pure white with rounded corners and shadow
- **Brand Text**: Deep teal (#00695c)
- **Input Borders**: Material Design style (gray → teal on focus)
- **Button**: Teal with hover lift effect

#### Typography  
- **Font**: Vazirmatn (loaded locally for offline use)
- **Direction**: RTL (Right-to-Left) throughout
- **Text Alignment**: Right-aligned for Persian language
- **Brand Title**: Large, bold "سپهر کلود" 
- **Form Labels**: "نام کاربری" and "رمز عبور"

#### Interactions
- **Input Focus**: Underline changes from gray to teal
- **Button Hover**: Lifts up with shadow, background darkens
- **Animations**: Smooth transitions (0.3s ease)

### 📋 Key Features Applied
✅ **Persian/Farsi Language**: All text in Persian
✅ **RTL Layout**: Right-to-left reading direction  
✅ **Material Design**: Floating labels, proper spacing
✅ **Offline Fonts**: Local Vazirmatn fonts (no internet needed)
✅ **Responsive**: Works on mobile and desktop
✅ **SEPEHR Branding**: Brand colors and Persian text
✅ **Accessibility**: High contrast, proper focus states

### 🔧 Technical Implementation
- **CSS Override Approach**: Styles the existing Vue.js login form
- **Important Rules**: Uses `!important` to override Nextcloud defaults
- **Component Targeting**: Targets both legacy and Vue.js selectors
- **Responsive Design**: Mobile-first approach with breakpoints

### 🚨 If You Don't See This Design

The issue might be:

1. **Nextcloud Not Installed**: If Nextcloud shows installation wizard instead of login
2. **Theme Not Active**: Check `config.php` has `'theme' => 'sepehr'`
3. **Cache Issues**: Browser cache or Nextcloud cache needs clearing
4. **File Permissions**: Theme files might not be readable
5. **CSS Not Loading**: Check network tab in browser dev tools

### 🎯 Expected User Experience

1. **Beautiful Welcome**: Gradient background immediately shows this isn't default Nextcloud
2. **Persian Interface**: All text in Farsi, properly right-aligned
3. **Modern Design**: Clean Material Design with shadows and hover effects
4. **Fast Loading**: Local fonts mean no external dependencies
5. **Professional Look**: Cohesive SEPEHR branding throughout

This is what the SEPEHR theme login page should look like once properly applied!
