/**
 * SPDX-FileCopyrightText: 2025 SEPEHR Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

console.log('SEPEHR login.js loaded');

// Set timezone offset
try {
    const timezoneInput = document.getElementById('timezone-offset');
    if (timezoneInput) {
        timezoneInput.value = new Date().getTimezoneOffset();
        console.log('Timezone offset set:', timezoneInput.value);
    }
} catch (e) {
    console.error('Error setting timezone:', e);
}

// Form switching functionality
function showForgotPasswordForm() {
    const loginForm = document.getElementById('loginForm');
    const forgotForm = document.getElementById('forgotForm');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    
    if (loginForm && forgotForm && formTitle && formSubtitle) {
        loginForm.classList.add('hidden');
        forgotForm.classList.remove('hidden');
        formTitle.textContent = 'بازیابی رمز عبور';
        formSubtitle.textContent = 'ایمیل یا نام کاربری خود را وارد کنید';
    }
}

function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const forgotForm = document.getElementById('forgotForm');
    const formTitle = document.getElementById('formTitle');
    const formSubtitle = document.getElementById('formSubtitle');
    
    if (loginForm && forgotForm && formTitle && formSubtitle) {
        forgotForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        formTitle.textContent = 'ورود به حساب کاربری';
        formSubtitle.textContent = 'لطفاً اطلاعات خود را وارد کنید';
    }
}

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
    const buttons = document.querySelectorAll('.login-button');
    buttons.forEach(function(button) {
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
});

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing login form');
    
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const forgotForm = document.getElementById('forgotForm');
    const forgotButton = document.getElementById('forgotButton');
    const dynamicMessage = document.getElementById('dynamicMessage');
    const userInput = document.getElementById('user');
    const passwordInput = document.getElementById('password');

    // Clean up URL parameters after failed login (remove ?direct=1&user=xxx)
    if (window.location.search.includes('direct=1')) {
        const loginError = document.getElementById('loginError');
        if (loginError) {
            // If error message is displayed, clean the URL after a short delay
            setTimeout(function() {
                const url = new URL(window.location);
                url.searchParams.delete('direct');
                url.searchParams.delete('user');
                url.searchParams.delete('redirect_url');
                window.history.replaceState({}, document.title, url.pathname);
            }, 100);
        }
    }

    // Hide error messages when user starts typing
    function addInputListeners() {
        [userInput, passwordInput].forEach(function(input) {
            if (input) {
                input.addEventListener('input', function() {
                    hideMessage();
                    // Also hide any existing error messages on page
                    const existingErrors = document.querySelectorAll('.message.error');
                    existingErrors.forEach(function(error) {
                        if (error.id !== 'dynamicMessage') {
                            error.style.display = 'none';
                        }
                    });
                });
            }
        });
    }
    
    addInputListeners();

    // Function to show dynamic messages
    function showMessage(message, type) {
        if (dynamicMessage) {
            dynamicMessage.innerHTML = '<p>' + message + '</p>';
            dynamicMessage.className = 'message ' + type;
            dynamicMessage.style.display = 'block';
            
            // Auto hide after 5 seconds for success messages, 10 seconds for errors
            const hideDelay = type === 'success' ? 5000 : 10000;
            setTimeout(function() {
                if (dynamicMessage.style.display !== 'none') {
                    dynamicMessage.style.display = 'none';
                }
            }, hideDelay);
        }
    }

    // Function to hide dynamic messages
    function hideMessage() {
        if (dynamicMessage) {
            dynamicMessage.style.display = 'none';
        }
    }

    if (loginForm && loginButton) {
        console.log('Login form found, adding event listener');
        loginForm.addEventListener('submit', function(e) {
            console.log('Login form submitted');
            hideMessage();
            
            // Basic validation before submission
            const userInput = document.getElementById('user');
            const passwordInput = document.getElementById('password');
            
            if (!userInput.value.trim()) {
                console.log('User input empty');
                e.preventDefault();
                showMessage('لطفاً نام کاربری خود را وارد کنید', 'error');
                return;
            }
            
            if (!passwordInput.value.trim()) {
                console.log('Password input empty');
                e.preventDefault();
                showMessage('لطفاً رمز عبور خود را وارد کنید', 'error');
                return;
            }
            
            console.log('Form validation passed, submitting...');
            
            // Show loading state
            loginButton.classList.add('loading');
            const buttonSpan = loginButton.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = 'در حال ورود...';
            }
            
            // Allow normal form submission
        });
    } else {
        console.error('Login form or button not found');
    }

    function resetLoginButton() {
        if (loginButton) {
            loginButton.classList.remove('loading');
            const buttonSpan = loginButton.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = 'ورود به سپهر';
            }
        }
    }

    if (forgotForm && forgotButton) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            hideMessage();
            
            forgotButton.classList.add('loading');
            const buttonSpan = forgotButton.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = 'در حال ارسال...';
            }

            const formData = new FormData(forgotForm);
            const emailInput = document.getElementById('forgot-email');
            
            // Basic validation
            if (!emailInput.value.trim()) {
                showMessage('لطفاً ایمیل یا نام کاربری خود را وارد کنید', 'error');
                resetForgotButton();
                return;
            }

            // Send AJAX request
            fetch(forgotForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showMessage('لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً صندوق پستی خود را بررسی کنید.', 'success');
                    emailInput.value = '';
                    
                    // Switch back to login form after 3 seconds
                    setTimeout(function() {
                        showLoginForm();
                    }, 3000);
                } else {
                    showMessage(data.msg || 'خطایی در ارسال ایمیل بازیابی رخ داد. لطفاً دوباره تلاش کنید.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('خطایی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.', 'error');
            })
            .finally(() => {
                resetForgotButton();
            });
        });
    }

    function resetForgotButton() {
        if (forgotButton) {
            forgotButton.classList.remove('loading');
            const buttonSpan = forgotButton.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = 'ارسال لینک بازیابی';
            }
        }
    }

    // Form switching event listeners
    const showForgotButton = document.getElementById('showForgotPassword');
    const showLoginButton = document.getElementById('showLoginForm');

    if (showForgotButton) {
        showForgotButton.addEventListener('click', function(e) {
            e.preventDefault();
            hideMessage();
            showForgotPasswordForm();
        });
    }

    if (showLoginButton) {
        showLoginButton.addEventListener('click', function(e) {
            e.preventDefault();
            hideMessage();
            showLoginForm();
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