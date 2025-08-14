# SEPEHR Login Page Design Mockup

## Visual Layout Description

### Overall Layout
- **Split-screen design**: Two equal columns (50% each) that span the full viewport height
- **Responsive**: On mobile, stacks vertically with brand section on top (40vh) and form below

### Left Side - Brand Section
- **Background**: Beautiful teal gradient (`linear-gradient(135deg, #00695c 0%, #4db6ac 50%, #26a69a 100%)`)
- **Pattern**: Subtle animated floating dots pattern overlay (white dots with 5% opacity)
- **Content (center-aligned)**:
  - **Logo**: 120px × 120px SVG logo with drop-shadow animation
  - **Title**: "سپهر" in large white text (3.5rem, 800 weight) with text shadow
  - **Subtitle**: Persian description in smaller white text (1.25rem, 300 weight)
  - **Features**: Three feature icons at bottom (security, cloud, sharing) with Persian labels

### Right Side - Form Section
- **Background**: Pure white (`#ffffff`)
- **Content (center-aligned with max-width 400px)**:
  - **Header**: "ورود به حساب کاربری" title in teal color
  - **Subtitle**: "لطفاً اطلاعات خود را وارد کنید"
  - **Form**: Material Design floating label inputs for username/password
  - **Options**: Remember me checkbox + forgot password link
  - **Button**: Teal button with hover effects and loading animation

## Typography
- **Font Family**: Vazirmatn (loaded locally from `/core/fonts/`)
- **Direction**: RTL (Right-to-Left) for Persian language support
- **Text Alignment**: Right-aligned throughout

## Color Scheme
- **Primary**: #00695c (teal)
- **Secondary**: #4db6ac (light teal)
- **Background**: #fafafa (light gray)
- **Text**: Default black/gray colors
- **Error**: #c62828 (red)
- **Success**: #2e7d32 (green)

## Animations
1. **Logo Glow**: Subtle drop-shadow animation (3s infinite)
2. **Floating Pattern**: Background dots float up/down (20s infinite)
3. **Button Hover**: Lift effect with shadow and shine animation
4. **Input Focus**: Floating labels with smooth transitions
5. **Loading State**: Spinning circle on form submission

## Material Design Elements
- **Floating Labels**: Labels start in input, float up on focus/fill
- **Ripple Effects**: Button has ripple/shine animation on hover
- **Elevation**: Buttons lift with shadow on hover
- **Transitions**: Smooth 0.3s ease transitions for all interactions

## File References Expected
- **CSS**: `themes/sepehr/core/css/design-system.css` (design tokens)
- **CSS**: `themes/sepehr/core/css/server.css` (components)
- **Fonts**: `themes/sepehr/core/fonts/Vazirmatn-*.woff2` (4 weights)
- **Logo**: `themes/sepehr/core/img/logo.svg`
- **Template**: `themes/sepehr/templates/login.php`

## Current Implementation Status
✅ Template file exists with complete HTML/CSS
✅ Fonts downloaded locally (4 Vazirmatn weights)
✅ Design system CSS with variables
✅ Theme configured in config.php
❓ May need cache clearing or proper theme activation
❓ Logo file may be missing
❓ Template may not be loading due to Nextcloud configuration

## Troubleshooting Checklist
1. Verify logo file exists at correct path
2. Check if Nextcloud installation is complete
3. Clear any theme/template caches
4. Verify theme directory permissions
5. Check if custom login template is properly overriding default
