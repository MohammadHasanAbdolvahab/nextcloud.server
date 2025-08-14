<?php
/**
 * SPDX-FileCopyrightText: 2025 SEPEHR Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
?>
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php p($theme->getTitle()); ?> - ورود</title>
    <link rel="stylesheet" href="<?php print_unescaped(OC::$WEBROOT); ?>/themes/sepehr/core/css/design-system.css">
    <link rel="stylesheet" href="<?php print_unescaped(OC::$WEBROOT); ?>/themes/sepehr/core/css/server.css">
    <style>
        /* SEPEHR Minimal Full-Page Login Design */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--sepehr-font-family);
            direction: rtl;
            height: 100vh;
            overflow: hidden;
            background: #fafafa;
        }

        /* Hide all headers and navigation on login page */
        #header,
        .header,
        nav,
        .navigation,
        .top-bar,
        #navigation,
        .header-wrapper,
        .header-container,
        .topbar,
        .app-navigation,
        .vue-sidebar,
        #app-sidebar,
        .sidebar {
            display: none !important;
            visibility: hidden !important;
        }

        /* Ensure full page coverage */
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
        }

        .login-wrapper {
            display: grid;
            grid-template-columns: 25% 75%;
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
        }

        /* Left Side - Brand & Visual */
        .brand-section {
            background: linear-gradient(135deg, #00695c 0%, #4db6ac 50%, #26a69a 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            position: relative;
            overflow: hidden;
        }

        .brand-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .brand-logo {
            width: 160px;
            height: 160px;
            margin-bottom: 2rem;
            filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2));
            animation: logoGlow 3s ease-in-out infinite;
        }

        @keyframes logoGlow {
            0%, 100% { filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2)); }
            50% { filter: drop-shadow(0 12px 24px rgba(0,0,0,0.3)); }
        }

        .brand-title {
            font-size: 3.5rem;
            font-weight: 800;
            color: white;
            margin-bottom: 1rem;
            font-family: var(--sepehr-font-headline);
            text-shadow: 0 4px 8px rgba(0,0,0,0.2);
            letter-spacing: -0.02em;
        }

        .brand-subtitle {
            font-size: 1.25rem;
            color: rgba(255,255,255,0.9);
            text-align: center;
            line-height: 1.6;
            max-width: 400px;
            font-weight: 300;
        }

        .brand-features {
            position: absolute;
            bottom: 3rem;
            right: 3rem;
            left: 3rem;
            display: flex;
            justify-content: space-around;
            gap: 2rem;
        }

        .feature-item {
            text-align: center;
            color: rgba(255,255,255,0.8);
            font-size: 0.875rem;
        }

        .feature-icon {
            width: 24px;
            height: 24px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Right Side - Login Form */
        .form-section {
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem;
            position: relative;
        }

        .form-container {
            width: 100%;
            max-width: 350px;
        }

        .form-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .form-title {
            font-size: 1.75rem;
            font-weight: 600;
            color: #00695c;
            margin-bottom: 0.75rem;
            font-family: var(--sepehr-font-headline);
        }

        .form-subtitle {
            font-size: 0.95rem;
            color: #666;
            font-weight: 400;
            line-height: 1.4;
        }

        .login-form {
            margin-bottom: 1.5rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .form-input {
            padding: 1.5rem 1rem 0.5rem 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            font-size: 1rem;
            font-family: var(--sepehr-font-family);
            background: #fafafa;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            direction: rtl;
            outline: none;
            color: #333;
            box-sizing: border-box;
            display: block;
            width: -webkit-fill-available !important;

        }

        .form-input:focus {
            border-color: #00695c;
            background: white;
            box-shadow: 0 2px 4px rgba(0, 105, 92, 0.1);
        }

        .form-input:focus + .form-label,
        .form-input.has-value + .form-label {
            transform: translateY(-1.5rem) scale(0.75);
            color: #00695c;
            font-weight: 500;
        }

        .form-label {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1rem;
            color: #666;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: right top;
            background: white;
            padding: 0 0.25rem;
            z-index: 1;
        }

        .form-options {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .remember-me {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.875rem;
            color: #555;
            cursor: pointer;
            line-height: 1;
            margin-bottom: 1rem;
        }

        .remember-me input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: #00695c;
            cursor: pointer;
            border-radius: 3px;
            margin: 0;
            flex-shrink: 0;
            border: 2px solid #ddd;
            background: white;
            position: relative;
        }

        .remember-me input[type="checkbox"]:checked {
            background-color: #00695c;
            border-color: #00695c;
        }

        .remember-me input[type="checkbox"]:checked::before {
            content: '✓';
            position: absolute;
            top: -2px;
            left: 2px;
            color: white;
            font-size: 12px;
            font-weight: bold;
        }

        .remember-me span {
            line-height: 18px;
            user-select: none;
        }

        .forgot-link {
            color: #00695c;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .forgot-link:hover {
            color: #004d40;
            text-decoration: underline;
        }

        .login-button {
            width: 100% !important;
            padding: 1rem;
            background: #00695c;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            font-family: var(--sepehr-font-family);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            text-align: center;
            display: block;
            box-sizing: border-box;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 4px rgba(0, 105, 92, 0.3);
        }

        .login-button:hover {
            background: #004d40;
            box-shadow: 0 4px 8px rgba(0, 105, 92, 0.4);
        }

        .login-button:active {
            box-shadow: 0 1px 2px rgba(0, 105, 92, 0.2);
        }

        /* Messages */
        .message {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
            text-align: center;
        }

        .message.error {
            background: #ffebee;
            color: #c62828;
            border: 1px solid #ffcdd2;
        }

        .message.success {
            background: #e8f5e8;
            color: #2e7d32;
            border: 1px solid #c8e6c9;
        }

        /* Loading State */
        .login-button.loading {
            opacity: 0.8;
            cursor: not-allowed;
        }

        .login-button.loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 2px solid transparent;
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
            .login-wrapper {
                grid-template-columns: 65% 35%;
            }
        }

        @media (max-width: 1024px) {
            .login-wrapper {
                grid-template-columns: 60% 40%;
            }
            
            .brand-title {
                font-size: 2.8rem;
            }

            .form-container {
                max-width: 320px;
            }
        }

        @media (max-width: 768px) {
            .login-wrapper {
                grid-template-columns: 1fr;
                grid-template-rows: 40vh 60vh;
            }

            .brand-section {
                padding: 1.5rem;
                min-height: 40vh;
                order: 1;
            }

            .form-section {
                padding: 2rem 1.5rem;
                order: 2;
            }

            .brand-title {
                font-size: 2.2rem;
                margin-bottom: 0.5rem;
            }

            .brand-subtitle {
                font-size: 1rem;
                margin-bottom: 1rem;
            }

            .brand-features {
                position: static;
                margin-top: 1rem;
                flex-wrap: wrap;
                gap: 1rem;
            }

            .feature-item {
                flex: 1;
                min-width: 80px;
            }

            .form-header {
                margin-bottom: 2rem;
            }

            .form-title {
                font-size: 1.4rem;
            }

            .form-subtitle {
                font-size: 0.9rem;
            }

            .form-container {
                max-width: 100%;
            }

            .form-options {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        }

        @media (max-width: 480px) {
            .login-wrapper {
                grid-template-rows: 35vh 65vh;
            }

            .brand-section {
                padding: 1rem;
                min-height: 35vh;
            }

            .brand-title {
                font-size: 1.8rem;
            }

            .brand-subtitle {
                font-size: 0.875rem;
            }

            .brand-logo {
                width: 100px;
                height: 100px;
                margin-bottom: 1rem;
            }

            .form-section {
                padding: 1.5rem 1rem;
            }

            .form-container {
                max-width: 100%;
            }

            .form-header {
                margin-bottom: 1.5rem;
            }

            .form-title {
                font-size: 1.25rem;
            }

            .form-subtitle {
                font-size: 0.85rem;
            }

            .form-options {
                flex-direction: column;
                gap: 1rem;
                align-items: flex-start;
            }

            .remember-me {
                align-self: flex-start;
            }

            .forgot-link {
                align-self: flex-start;
            }

            .brand-features {
                display: none; /* Hide features on very small screens */
            }
        }

        @media (max-width: 360px) {
            .login-wrapper {
                grid-template-rows: 30vh 70vh;
            }

            .brand-section {
                padding: 0.75rem;
                min-height: 30vh;
            }

            .form-section {
                padding: 1rem 0.75rem;
            }

            .brand-title {
                font-size: 1.5rem;
            }

            .form-input {
                font-size: 16px; /* Prevent zoom on iOS */
                padding: 1.25rem 0.75rem 0.5rem 0.75rem;
            }

            .form-label {
                right: 0.75rem;
            }

            .login-button {
                padding: 0.875rem;
                font-size: 0.95rem;
            }
        }
    </style>
</head>
<body>
    <div class="login-wrapper">
        <!-- Form Section - Now on RIGHT -->
        <div class="form-section">
            <div class="form-container">
                <div class="form-header">
                    <h2 class="form-title">ورود به حساب کاربری</h2>
                    <p class="form-subtitle">لطفاً اطلاعات خود را وارد کنید</p>
                </div>

                <?php if (isset($_['errors']) && !empty($_['errors'])): ?>
                    <div class="message error">
                        <?php foreach ($_['errors'] as $error): ?>
                            <p><?php p($error); ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>

                <?php if (isset($_['messages']) && !empty($_['messages'])): ?>
                    <div class="message success">
                        <?php foreach ($_['messages'] as $message): ?>
                            <p><?php p($message); ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>

                <form method="post" name="login" class="login-form" id="loginForm">
                    <input type="hidden" name="timezone-offset" id="timezone-offset"/>
                    <input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>">
                    
                            <div class="form-group">
                                <input type="text" name="user" id="user" 
                                       class="form-input" 
                                       value="<?php p($_['user']); ?>" 
                                       autocomplete="username" 
                                       autocorrect="off" 
                                       autocapitalize="none" 
                                       autofocus />
                                <label for="user" class="form-label">نام کاربری</label>
                            </div>

                            <div class="form-group">
                                <input type="password" name="password" id="password" 
                                       class="form-input" 
                                       autocomplete="current-password" />
                                <label for="password" class="form-label">رمز عبور</label>
                            </div>     
                            <div class="form-group">
                                <label class="remember-me" for="remember_login">
                                    <input type="checkbox" name="remember_login" value="1" id="remember_login">
                                    <span>مرا به خاطر بسپار</span>
                                </label>
                            </div>
                            <div class="form-options">
                                <?php if (isset($_['resetPasswordLink']) && $_['resetPasswordLink']): ?>
                                    <a href="<?php print_unescaped($_['resetPasswordLink']); ?>" class="forgot-link">فراموشی رمز عبور</a>
                                <?php endif; ?>
                            </div>
                    <button type="submit" class="login-button" id="loginButton">
                        <span>ورود به سپهر</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Brand Section - Now on LEFT -->
        <div class="brand-section">
            <img src="<?php print_unescaped(OC::$WEBROOT); ?>/themes/sepehr/core/img/logo.svg" alt="<?php p($theme->getTitle()); ?>" class="brand-logo">
            <h1 class="brand-title"><?php p($theme->getTitle()); ?></h1>
            <p class="brand-subtitle">پلتفرم ابری پیشرفته برای مدیریت و اشتراک‌گذاری فایل‌ها با امنیت بالا</p>
            
            <div class="brand-features">
                <div class="feature-item">
                    <div class="feature-icon">🔒</div>
                    <div>امنیت بالا</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">☁️</div>
                    <div>ذخیره ابری</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🤝</div>
                    <div>اشتراک‌گذاری</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Set timezone offset
        document.getElementById('timezone-offset').value = new Date().getTimezoneOffset();

        // Material Design floating labels
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('.form-input');
            
            function updateLabel(input) {
                if (input.value && input.value.trim() !== '') {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            }
            
            inputs.forEach(function(input) {
                // Initial check
                updateLabel(input);
                
                // On input event
                input.addEventListener('input', function() {
                    updateLabel(this);
                });
                
                // On focus/blur for better UX
                input.addEventListener('blur', function() {
                    updateLabel(this);
                });
            });
            
            // Ripple effect for button
            const button = document.querySelector('.login-button');
            if (button) {
                button.addEventListener('click', function(e) {
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            }
        });

        // Form handling
        const loginForm = document.getElementById('loginForm');
        const loginButton = document.getElementById('loginButton');

        loginForm.addEventListener('submit', function(e) {
            loginButton.classList.add('loading');
            loginButton.querySelector('span').textContent = 'در حال ورود...';
        });
    </script>

    <style>
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    </style>
</body>
</html>
