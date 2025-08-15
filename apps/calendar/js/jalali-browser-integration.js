/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Jalali Calendar Integration for Nextcloud Calendar (Browser-compatible)
 * 
 * This file provides a browser-compatible integration for Jalali calendar support
 * without requiring build tools. It monkey-patches the existing FullCalendar
 * configuration to support Persian calendar display.
 * 
 * Usage: Include this script after the main calendar scripts load
 */

(function(window) {
    'use strict';

    // Persian calendar constants
    const JALALI_MONTHS = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];

    const JALALI_WEEKDAYS = [
        'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'
    ];

    // Simple Jalali conversion using browser Date API
    class SimpleJalaliConverter {
        constructor() {
            this.enabled = false;
            this.initializeConverter();
        }

        initializeConverter() {
            // Check if user has Persian locale
            const userLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
            const isPersinaLocale = userLang.includes('fa') || userLang.includes('ir');
            
            // Check for explicit setting
            this.enabled = isPersinaLocale || window.NC_CALENDAR_JALALI === true;
            
            if (this.enabled) {
                console.info('🎌 Jalali Calendar enabled for locale:', userLang);
            }
        }

        /**
         * Convert Gregorian date to approximate Jalali
         * This is a simplified conversion for display purposes
         */
        toJalali(gregDate) {
            if (!this.enabled || !gregDate) return null;

            try {
                // Approximate conversion (simplified)
                const gregYear = gregDate.getFullYear();
                const jalaliYear = gregYear - 621;
                
                // Get day of year
                const startOfYear = new Date(gregYear, 0, 1);
                const dayOfYear = Math.floor((gregDate - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
                
                // Approximate Jalali month and day
                let jalaliMonth, jalaliDay;
                
                if (dayOfYear <= 186) {
                    // First 6 months (31 days each)
                    jalaliMonth = Math.ceil(dayOfYear / 31);
                    jalaliDay = dayOfYear - ((jalaliMonth - 1) * 31);
                } else {
                    // Last 6 months (30 days each, except last month)
                    const remainingDays = dayOfYear - 186;
                    jalaliMonth = 6 + Math.ceil(remainingDays / 30);
                    jalaliDay = remainingDays - ((jalaliMonth - 7) * 30);
                }

                // Adjust boundaries
                jalaliMonth = Math.max(1, Math.min(12, jalaliMonth));
                jalaliDay = Math.max(1, Math.min(31, jalaliDay));

                return {
                    year: jalaliYear,
                    month: jalaliMonth,
                    day: jalaliDay,
                    monthName: JALALI_MONTHS[jalaliMonth - 1],
                    weekday: gregDate.getDay(), // 0 = Sunday
                    weekdayName: JALALI_WEEKDAYS[(gregDate.getDay() + 1) % 7] // Saturday = 0 in Jalali
                };
            } catch (error) {
                console.warn('Jalali conversion error:', error);
                return null;
            }
        }

        /**
         * Format date for display
         */
        formatJalali(date, pattern = 'YYYY/MM/DD') {
            if (!this.enabled) return null;
            
            const jalali = this.toJalali(date);
            if (!jalali) return null;

            return pattern
                .replace('YYYY', jalali.year.toString())
                .replace('MM', jalali.month.toString().padStart(2, '0'))
                .replace('DD', jalali.day.toString().padStart(2, '0'))
                .replace('MMMM', jalali.monthName);
        }
    }

    // Initialize converter
    const jalaliConverter = new SimpleJalaliConverter();

    /**
     * Enhanced FullCalendar locale provider with Jalali support
     */
    function createJalaliAwareLocaleProvider() {
        // Store original function if it exists
        const originalGetFullCalendarLocale = window.getFullCalendarLocale;

        return function getFullCalendarLocale() {
            // Get base configuration
            let config = {};
            if (originalGetFullCalendarLocale) {
                config = originalGetFullCalendarLocale();
            } else {
                // Fallback configuration
                config = {
                    firstDay: 1, // Default Monday
                    locale: 'en',
                    weekText: 'W',
                    allDayText: 'All day',
                    moreLinkText: (n) => `${n} more`,
                    noEventsText: 'No events to display'
                };
            }

            // Apply Jalali enhancements for Persian locale
            if (jalaliConverter.enabled) {
                return {
                    ...config,
                    firstDay: 6, // Saturday
                    locale: 'fa',
                    direction: 'rtl',
                    // Persian month names
                    monthNames: JALALI_MONTHS,
                    monthNamesShort: JALALI_MONTHS.map(m => m.substr(0, 3)),
                    // Persian day names
                    dayNames: JALALI_WEEKDAYS,
                    dayNamesShort: JALALI_WEEKDAYS.map(d => d.substr(0, 2)),
                    dayNamesMin: JALALI_WEEKDAYS.map(d => d.substr(0, 1)),
                    // Localized text
                    weekText: 'ه',
                    allDayText: 'تمام روز',
                    moreLinkText: (n) => `${n} بیشتر`,
                    noEventsText: 'هیچ رویدادی برای نمایش وجود ندارد'
                };
            }

            return config;
        };
    }

    /**
     * Patch FullCalendar date formatting
     */
    function patchDateFormatting() {
        if (!jalaliConverter.enabled) return;

        // Override Date.prototype.toLocaleDateString for Persian locale
        const originalToLocaleDateString = Date.prototype.toLocaleDateString;
        
        Date.prototype.toLocaleDateString = function(locale, options) {
            if (locale && locale.includes('fa') && jalaliConverter.enabled) {
                const formatted = jalaliConverter.formatJalali(this);
                if (formatted) return formatted;
            }
            return originalToLocaleDateString.call(this, locale, options);
        };
    }

    /**
     * Patch navigation elements for Jalali month names
     */
    function patchNavigation() {
        if (!jalaliConverter.enabled) return;

        // Wait for DOM to be ready
        function waitForNavigation() {
            // Look for calendar navigation elements
            const navElements = document.querySelectorAll('.fc-toolbar-title, .fc-button-primary');
            
            navElements.forEach(element => {
                const observer = new MutationObserver(() => {
                    const text = element.textContent;
                    
                    // Replace Gregorian month names with Jalali ones
                    if (text && element.className.includes('fc-toolbar-title')) {
                        const currentDate = new Date(); // This would need to be the actual calendar date
                        const jalali = jalaliConverter.toJalali(currentDate);
                        
                        if (jalali) {
                            // Simple replacement - this would need more sophisticated parsing
                            const jalaliTitle = `${jalali.monthName} ${jalali.year}`;
                            if (element.textContent !== jalaliTitle) {
                                element.textContent = jalaliTitle;
                            }
                        }
                    }
                });
                
                observer.observe(element, { childList: true, subtree: true });
            });
        }

        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', waitForNavigation);
        } else {
            waitForNavigation();
        }
    }

    /**
     * Initialize Jalali calendar integration
     */
    function initializeJalaliIntegration() {
        console.info('🔄 Initializing Jalali Calendar integration...');

        // Replace the global function if it exists
        if (typeof window.getFullCalendarLocale === 'function') {
            window.getFullCalendarLocale = createJalaliAwareLocaleProvider();
            console.info('✅ Patched getFullCalendarLocale function');
        }

        // Apply date formatting patches
        patchDateFormatting();
        console.info('✅ Applied date formatting patches');

        // Setup navigation patches
        patchNavigation();
        console.info('✅ Setup navigation patches');

        // Set global flag
        window.NC_CALENDAR_JALALI = jalaliConverter.enabled;

        if (jalaliConverter.enabled) {
            console.info('🎌 Jalali Calendar integration active');
            
            // Add CSS for RTL support
            const style = document.createElement('style');
            style.textContent = `
                .fc-direction-rtl .fc-toolbar {
                    direction: rtl;
                }
                .fc-direction-rtl .fc-button-group {
                    direction: ltr;
                }
                .fc-direction-rtl .fc-daygrid-day-number {
                    text-align: right;
                }
                .calendar-jalali .fc-col-header-cell {
                    text-align: center;
                }
            `;
            document.head.appendChild(style);
        } else {
            console.info('ℹ️ Jalali Calendar not enabled (no Persian locale detected)');
        }
    }

    // Public API
    window.JalaliCalendar = {
        converter: jalaliConverter,
        enable: function() {
            jalaliConverter.enabled = true;
            window.NC_CALENDAR_JALALI = true;
            initializeJalaliIntegration();
        },
        disable: function() {
            jalaliConverter.enabled = false;
            window.NC_CALENDAR_JALALI = false;
        },
        isEnabled: function() {
            return jalaliConverter.enabled;
        },
        formatDate: function(date) {
            return jalaliConverter.formatJalali(date);
        }
    };

    // Auto-initialize when script loads
    initializeJalaliIntegration();

})(window);
