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
            grid-template-columns: 1fr 1fr;
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
            width: 120px;
            height: 120px;
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
            max-width: 400px;
        }

        .form-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .form-title {
            font-size: 2rem;
            font-weight: 700;
            color: #00695c;
            margin-bottom: 0.5rem;
            font-family: var(--sepehr-font-headline);
        }

        .form-subtitle {
            font-size: 1rem;
            color: #666;
            font-weight: 300;
        }

        .login-form {
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .form-input {
            width: 100%;
            padding: 1rem 0;
            border: none;
            border-bottom: 2px solid #e0e0e0;
            font-size: 1rem;
            font-family: var(--sepehr-font-family);
            background: transparent;
            transition: all 0.3s ease;
            direction: rtl;
            outline: none;
        }

        .form-input:focus {
            border-bottom-color: #00695c;
        }

        .form-input:focus + .form-label,
        .form-input:not(:placeholder-shown) + .form-label {
            transform: translateY(-1.5rem) scale(0.875);
            color: #00695c;
        }

        .form-label {
            position: absolute;
            top: 1rem;
            right: 0;
            font-size: 1rem;
            color: #999;
            pointer-events: none;
            transition: all 0.3s ease;
            transform-origin: right top;
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .remember-me {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: #666;
            cursor: pointer;
        }

        .remember-me input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: #00695c;
        }

        .forgot-link {
            color: #00695c;
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .forgot-link:hover {
            color: #004d40;
        }

        .login-button {
            width: 100%;
            padding: 1rem;
            background: #00695c;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            font-family: var(--sepehr-font-family);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .login-button::before {
            content: '';
            position: absolute;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: right 0.6s ease;
        }

        .login-button:hover {
            background: #004d40;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 105, 92, 0.3);
        }

        .login-button:hover::before {
            right: 100%;
        }

        .login-button:active {
            transform: translateY(0);
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
        @media (max-width: 1024px) {
            .login-wrapper {
                grid-template-columns: 45% 55%;
            }
            
            .brand-title {
                font-size: 2.8rem;
            }
        }

        @media (max-width: 768px) {
            .login-wrapper {
                grid-template-columns: 1fr;
                grid-template-rows: 35vh 1fr;
            }

            .brand-section {
                padding: 1.5rem;
                min-height: 35vh;
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

            .form-section {
                padding: 2rem 1.5rem;
            }

            .form-header {
                margin-bottom: 2rem;
            }

            .form-title {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .login-wrapper {
                grid-template-rows: 30vh 1fr;
            }

            .brand-section {
                padding: 1rem;
                min-height: 30vh;
            }

            .brand-title {
                font-size: 1.8rem;
            }

            .brand-subtitle {
                font-size: 0.875rem;
            }

            .brand-logo {
                width: 60px;
                height: 60px;
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
                font-size: 1.3rem;
            }

            .form-subtitle {
                font-size: 0.875rem;
            }

            .form-options {
                flex-direction: column;
                gap: 1rem;
                align-items: flex-start;
            }

            .brand-features {
                display: none; /* Hide features on very small screens */
            }
        }

        @media (max-width: 360px) {
            .brand-section {
                padding: 0.75rem;
            }

            .form-section {
                padding: 1rem 0.75rem;
            }

            .brand-title {
                font-size: 1.5rem;
            }

            .form-input {
                font-size: 16px; /* Prevent zoom on iOS */
            }
        }
    </style>
</head>
<body>
    <div class="login-wrapper">
        <!-- Brand Section -->
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

        <!-- Form Section -->
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
                        <input type="text" name="user" id="user" class="form-input" placeholder=" " value="<?php p($_['username']); ?>" <?php p($_['user_autofocus'] ? 'autofocus' : ''); ?> autocomplete="username" required>
                        <label for="user" class="form-label">نام کاربری</label>
                    </div>
                    
                    <div class="form-group">
                        <input type="password" name="password" id="password" class="form-input" placeholder=" " <?php p($_['user_autofocus'] ? '' : 'autofocus'); ?> autocomplete="current-password" required>
                        <label for="password" class="form-label">رمز عبور</label>
                    </div>
                    
                    <div class="form-options">
                        <label class="remember-me">
                            <input type="checkbox" name="remember_login" value="1" id="remember_login">
                            <span>مرا به خاطر بسپار</span>
                        </label>
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
    </div>

    <script>
        // Set timezone offset
        document.getElementById('timezone-offset').value = new Date().getTimezoneOffset();

        // Form handling
        const loginForm = document.getElementById('loginForm');
        const loginButton = document.getElementById('loginButton');

        loginForm.addEventListener('submit', function(e) {
            loginButton.classList.add('loading');
            loginButton.querySelector('span').textContent = 'در حال ورود...';
        });

        // Floating label effects
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            // Check if input has value on page load
            if (input.value) {
                input.classList.add('has-value');
            }

            input.addEventListener('focus', function() {
                this.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.classList.remove('focused');
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });
        });
    </script>
</body>
</html>
