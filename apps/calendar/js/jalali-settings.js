/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Jalali Calendar User Settings Component
 * 
 * Provides user interface for Jalali calendar preferences
 */

(function(window, OC, OCA) {
    'use strict';

    if (!OCA.Calendar) {
        OCA.Calendar = {};
    }

    /**
     * Jalali Calendar Settings Manager
     */
    OCA.Calendar.JalaliSettings = {
        
        /**
         * Initialize settings panel
         */
        init: function() {
            this.loadSettings();
            this.bindEvents();
            this.injectSettingsUI();
        },

        /**
         * Load user settings from server/localStorage
         */
        loadSettings: function() {
            this.settings = {
                enabled: localStorage.getItem('nextcloud.calendar.jalali.enabled') === 'true',
                autoDetect: localStorage.getItem('nextcloud.calendar.jalali.autoDetect') !== 'false',
                showToggle: this.isPersinaUser(),
                monthNames: localStorage.getItem('nextcloud.calendar.jalali.monthNames') !== 'false',
                rtlLayout: localStorage.getItem('nextcloud.calendar.jalali.rtlLayout') !== 'false'
            };
            
            // Auto-detect for Persian users
            if (this.settings.autoDetect && this.isPersinaUser()) {
                this.settings.enabled = true;
            }
        },

        /**
         * Save settings to localStorage
         */
        saveSettings: function() {
            Object.keys(this.settings).forEach(key => {
                if (key !== 'showToggle') {
                    localStorage.setItem(`nextcloud.calendar.jalali.${key}`, this.settings[key]);
                }
            });
            
            // Apply settings immediately
            this.applySettings();
        },

        /**
         * Check if user has Persian locale
         */
        isPersinaUser: function() {
            const locale = OC.getLocale() || navigator.language || '';
            return locale.toLowerCase().includes('fa') || locale.toLowerCase().includes('ir');
        },

        /**
         * Apply current settings to calendar
         */
        applySettings: function() {
            if (window.JalaliCalendar) {
                if (this.settings.enabled) {
                    window.JalaliCalendar.enable();
                    
                    // Apply RTL layout if enabled
                    if (this.settings.rtlLayout) {
                        const calendarEl = document.querySelector('.fc');
                        if (calendarEl) {
                            calendarEl.classList.add('calendar-jalali', 'fc-direction-rtl');
                        }
                    }
                } else {
                    window.JalaliCalendar.disable();
                    
                    // Remove RTL layout
                    const calendarEl = document.querySelector('.fc');
                    if (calendarEl) {
                        calendarEl.classList.remove('calendar-jalali', 'fc-direction-rtl');
                    }
                }
            }
        },

        /**
         * Bind event handlers
         */
        bindEvents: function() {
            const self = this;
            
            // Listen for setting changes
            document.addEventListener('jalali-setting-changed', function(event) {
                const { setting, value } = event.detail;
                self.settings[setting] = value;
                self.saveSettings();
            });
        },

        /**
         * Inject settings UI into calendar settings panel
         */
        injectSettingsUI: function() {
            const self = this;
            
            // Wait for settings panel to be available
            const checkSettingsPanel = () => {
                const settingsPanel = document.querySelector('#app-settings') || 
                                    document.querySelector('.app-settings') ||
                                    document.querySelector('#calendar-settings');
                
                if (settingsPanel) {
                    this.createSettingsUI(settingsPanel);
                } else {
                    // Try again after a short delay
                    setTimeout(checkSettingsPanel, 500);
                }
            };
            
            // Start checking when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', checkSettingsPanel);
            } else {
                checkSettingsPanel();
            }
        },

        /**
         * Create the settings UI elements
         */
        createSettingsUI: function(parentElement) {
            // Only show for Persian users or when manually enabled
            if (!this.settings.showToggle && !this.settings.enabled) {
                return;
            }

            const settingsHtml = `
                <div id="jalali-calendar-settings" class="section">
                    <h2>🎌 تقویم جلالی (Jalali Calendar)</h2>
                    
                    <div class="jalali-setting-item">
                        <input type="checkbox" id="jalali-enabled" class="checkbox" ${this.settings.enabled ? 'checked' : ''}>
                        <label for="jalali-enabled">فعال‌سازی تقویم جلالی (Enable Jalali Calendar)</label>
                    </div>
                    
                    <div class="jalali-setting-item">
                        <input type="checkbox" id="jalali-auto-detect" class="checkbox" ${this.settings.autoDetect ? 'checked' : ''}>
                        <label for="jalali-auto-detect">تشخیص خودکار زبان (Auto-detect language)</label>
                    </div>
                    
                    <div class="jalali-setting-item">
                        <input type="checkbox" id="jalali-month-names" class="checkbox" ${this.settings.monthNames ? 'checked' : ''}>
                        <label for="jalali-month-names">نمایش نام ماه‌های فارسی (Show Persian month names)</label>
                    </div>
                    
                    <div class="jalali-setting-item">
                        <input type="checkbox" id="jalali-rtl-layout" class="checkbox" ${this.settings.rtlLayout ? 'checked' : ''}>
                        <label for="jalali-rtl-layout">چیدمان راست به چپ (RTL layout)</label>
                    </div>
                    
                    <div class="jalali-info">
                        <p><em>تغییرات پس از بارگذاری مجدد صفحه اعمال می‌شود</em></p>
                        <p><em>Changes will be applied after page reload</em></p>
                    </div>
                </div>
            `;

            // Create container and insert
            const settingsContainer = document.createElement('div');
            settingsContainer.innerHTML = settingsHtml;
            parentElement.appendChild(settingsContainer);

            // Add CSS for settings
            this.addSettingsCSS();

            // Bind event handlers for the new elements
            this.bindSettingsEvents();
        },

        /**
         * Add CSS for settings UI
         */
        addSettingsCSS: function() {
            const style = document.createElement('style');
            style.textContent = `
                #jalali-calendar-settings {
                    margin: 20px 0;
                    padding: 15px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                    background: #f9f9f9;
                }
                
                #jalali-calendar-settings h2 {
                    margin-top: 0;
                    color: #333;
                    font-size: 16px;
                }
                
                .jalali-setting-item {
                    margin: 10px 0;
                    display: flex;
                    align-items: center;
                }
                
                .jalali-setting-item input[type="checkbox"] {
                    margin-right: 8px;
                }
                
                .jalali-setting-item label {
                    cursor: pointer;
                    user-select: none;
                }
                
                .jalali-info {
                    margin-top: 15px;
                    font-size: 12px;
                    color: #666;
                }
                
                .jalali-info p {
                    margin: 5px 0;
                }
            `;
            document.head.appendChild(style);
        },

        /**
         * Bind events for settings controls
         */
        bindSettingsEvents: function() {
            const self = this;
            
            // Enable/disable toggle
            const enabledCheckbox = document.getElementById('jalali-enabled');
            if (enabledCheckbox) {
                enabledCheckbox.addEventListener('change', function() {
                    const event = new CustomEvent('jalali-setting-changed', {
                        detail: { setting: 'enabled', value: this.checked }
                    });
                    document.dispatchEvent(event);
                });
            }

            // Auto-detect toggle
            const autoDetectCheckbox = document.getElementById('jalali-auto-detect');
            if (autoDetectCheckbox) {
                autoDetectCheckbox.addEventListener('change', function() {
                    const event = new CustomEvent('jalali-setting-changed', {
                        detail: { setting: 'autoDetect', value: this.checked }
                    });
                    document.dispatchEvent(event);
                });
            }

            // Month names toggle
            const monthNamesCheckbox = document.getElementById('jalali-month-names');
            if (monthNamesCheckbox) {
                monthNamesCheckbox.addEventListener('change', function() {
                    const event = new CustomEvent('jalali-setting-changed', {
                        detail: { setting: 'monthNames', value: this.checked }
                    });
                    document.dispatchEvent(event);
                });
            }

            // RTL layout toggle
            const rtlLayoutCheckbox = document.getElementById('jalali-rtl-layout');
            if (rtlLayoutCheckbox) {
                rtlLayoutCheckbox.addEventListener('change', function() {
                    const event = new CustomEvent('jalali-setting-changed', {
                        detail: { setting: 'rtlLayout', value: this.checked }
                    });
                    document.dispatchEvent(event);
                });
            }
        },

        /**
         * Show a notification about setting changes
         */
        showNotification: function(message) {
            if (OC.Notification) {
                OC.Notification.showTemporary(message);
            } else {
                console.info('Jalali Calendar:', message);
            }
        }
    };

    // Auto-initialize when calendar app loads
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit for calendar app to fully load
        setTimeout(() => {
            if (OCA.Calendar && window.JalaliCalendar) {
                OCA.Calendar.JalaliSettings.init();
                console.info('🎌 Jalali Calendar settings initialized');
            }
        }, 2000);
    });

})(window, OC, OCA);
