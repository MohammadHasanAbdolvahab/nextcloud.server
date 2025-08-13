<?php
/**
 * SPDX-FileCopyrightText: 2025 Nexus Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
?>
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php p($theme->getTitle()); ?> - ورود</title>
    <link rel="stylesheet" href="<?php print_unescaped(OC::$WEBROOT); ?>/themes/nexus/core/css/design-system.css">
    <link rel="stylesheet" href="<?php print_unescaped(OC::$WEBROOT); ?>/themes/nexus/core/css/server.css">
    <style>
        /* SEPEHR Login Page Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: var(--nexus-font-family);
            background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #4db6ac 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            direction: rtl;
        }

        .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 3rem;
            width: 100%;
            max-width: 450px;
            margin: 2rem;
            position: relative;
            overflow: hidden;
        }

        .login-container::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--sepehr-primary), var(--sepehr-accent));
        }

        .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .login-logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 1.5rem;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }

        .login-title {
            font-size: 2rem;
            font-weight: 700;
            color: var(--sepehr-primary);
            margin: 0 0 0.5rem;
            font-family: var(--nexus-font-headline);
        }

        .login-subtitle {
            font-size: 1rem;
            color: var(--sepehr-text-secondary);
            margin: 0;
            font-weight: 400;
        }

        .login-form {
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--sepehr-text);
            margin-bottom: 0.5rem;
        }

        .form-input {
            width: 100%;
            padding: 1rem 1.25rem;
            border: 2px solid #e0e0e0;
            border-radius: 12px;
            font-size: 1rem;
            font-family: var(--nexus-font-family);
            background: #fafafa;
            transition: all 0.3s ease;
            direction: rtl;
        }

        .form-input:focus {
            outline: none;
            border-color: var(--sepehr-primary);
            box-shadow: 0 0 0 3px rgba(0, 105, 92, 0.1);
            background: white;
        }

        .form-input::placeholder {
            color: #9e9e9e;
            font-weight: 400;
        }

        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .remember-me {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: var(--sepehr-text);
            cursor: pointer;
        }

        .remember-me input[type="checkbox"] {
            width: 18px;
            height: 18px;
            accent-color: var(--sepehr-primary);
        }

        .forgot-link {
            color: var(--sepehr-primary);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .forgot-link:hover {
            color: var(--sepehr-primary-dark);
            text-decoration: underline;
        }

        .login-button {
            width: 100%;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--sepehr-primary), var(--sepehr-accent));
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            font-family: var(--nexus-font-family);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .login-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .login-button:hover::before {
            left: 100%;
        }

        .login-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 105, 92, 0.3);
        }

        .login-button:active {
            transform: translateY(0);
        }

        .login-footer {
            text-align: center;
            padding-top: 1.5rem;
            border-top: 1px solid #e0e0e0;
        }

        .login-footer p {
            font-size: 0.75rem;
            color: var(--sepehr-text-secondary);
            margin: 0;
            line-height: 1.5;
        }

        /* Floating particles animation */
        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        /* Responsive Design */
        @media (max-width: 480px) {
            .login-container {
                padding: 2rem;
                margin: 1rem;
                border-radius: 16px;
            }

            .login-title {
                font-size: 1.75rem;
            }

            .form-options {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.75rem;
            }
        }

        /* Error/Success Messages */
        .message {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 0.875rem;
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

        /* Loading state */
        .login-button.loading {
            opacity: 0.7;
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
    </style>
</head>
<body>
    <!-- Floating Particles Background -->
    <div class="particles">
        <div class="particle" style="left: 10%; top: 20%; width: 6px; height: 6px; animation-delay: 0s;"></div>
        <div class="particle" style="left: 20%; top: 80%; width: 8px; height: 8px; animation-delay: 1s;"></div>
        <div class="particle" style="left: 60%; top: 30%; width: 4px; height: 4px; animation-delay: 2s;"></div>
        <div class="particle" style="left: 80%; top: 70%; width: 7px; height: 7px; animation-delay: 3s;"></div>
        <div class="particle" style="left: 40%; top: 10%; width: 5px; height: 5px; animation-delay: 4s;"></div>
    </div>

    <div class="login-container">
        <div class="login-header">
            <img src="<?php print_unescaped(OC::$WEBROOT); ?>/themes/nexus/core/img/logo.svg" alt="<?php p($theme->getTitle()); ?>" class="login-logo">
            <h1 class="login-title"><?php p($theme->getTitle()); ?></h1>
            <p class="login-subtitle"><?php p($theme->getSlogan()); ?></p>
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
                <label for="user" class="form-label">نام کاربری</label>
                <input type="text" name="user" id="user" class="form-input" placeholder="نام کاربری خود را وارد کنید" value="<?php p($_['username']); ?>" <?php p($_['user_autofocus'] ? 'autofocus' : ''); ?> autocomplete="username" required>
            </div>
            
            <div class="form-group">
                <label for="password" class="form-label">رمز عبور</label>
                <input type="password" name="password" id="password" class="form-input" placeholder="رمز عبور خود را وارد کنید" <?php p($_['user_autofocus'] ? '' : 'autofocus'); ?> autocomplete="current-password" required>
            </div>
            
            <div class="form-options">
                <label class="remember-me">
                    <input type="checkbox" name="remember_login" value="1" id="remember_login">
                    <span>مرا به خاطر بسپار</span>
                </label>
                <?php if (isset($_['resetPasswordLink']) && $_['resetPasswordLink']): ?>
                <a href="<?php print_unescaped($_['resetPasswordLink']); ?>" class="forgot-link">رمز عبور را فراموش کرده‌اید؟</a>
                <?php endif; ?>
            </div>
            
            <button type="submit" class="login-button" id="loginButton">
                <span>ورود به سپهر کلود</span>
            </button>
        </form>

        <div class="login-footer">
            <p><?php print_unescaped($theme->getLongFooter()); ?></p>
        </div>
    </div>

    <script>
        // Set timezone offset
        document.getElementById('timezone-offset').value = new Date().getTimezoneOffset();

        // Enhanced form handling
        const loginForm = document.getElementById('loginForm');
        const loginButton = document.getElementById('loginButton');

        loginForm.addEventListener('submit', function(e) {
            loginButton.classList.add('loading');
            loginButton.querySelector('span').textContent = 'در حال ورود...';
        });

        // Input focus effects
        const inputs = document.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });

        // Add more floating particles dynamically
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            document.querySelector('.particles').appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 6000);
        }

        // Create new particles periodically
        setInterval(createParticle, 2000);
    </script>
</body>
</html>
