/**
 * SPDX-FileCopyrightText: 2025 SEPEHR Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Set timezone offset
document.getElementById('timezone-offset').value = new Date().getTimezoneOffset();

// Material Design floating labels - simplified for autofill detection
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-input');
    
    function checkForAutofill() {
        inputs.forEach(function(input) {
            if (input.value && input.value.trim() !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    }
    
    // Check for autofilled values after page load
    setTimeout(checkForAutofill, 100);
    setTimeout(checkForAutofill, 500);
    setTimeout(checkForAutofill, 1000);
    
    // Ripple effect for button
    const button = document.querySelector('.login-button');
    if (button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // CSP-compliant styling
            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    }
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');

    if (loginForm && loginButton) {
        loginForm.addEventListener('submit', function(e) {
            loginButton.classList.add('loading');
            const buttonSpan = loginButton.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = 'در حال ورود...';
            }
        });
    }
});

// Password toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    const eyeOffIcon = document.getElementById('eye-off-icon');
    
    if (passwordInput && eyeIcon && eyeOffIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.add('hidden');
            eyeOffIcon.classList.remove('hidden');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('hidden');
            eyeOffIcon.classList.add('hidden');
        }
    }
}

// Add keyboard support for password toggle
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        togglePassword();
    }
});

// Initialize password toggle button
document.addEventListener('DOMContentLoaded', function() {
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function(e) {
            e.preventDefault();
            togglePassword();
        });
    }
});