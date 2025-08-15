/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Jalali (Persian) calendar date adapter for Nextcloud Calendar
 * 
 * This module provides bidirectional date conversion between Gregorian and Jalali calendars.
 * Storage/CalDAV backend remains Gregorian (ISO 8601), only UI is transformed to Jalali.
 * 
 * Dependencies:
 * - dayjs with jalaliday plugin (preferred for bundle size)
 * - OR moment with moment-jalaali plugin (fallback)
 * 
 * Add to package.json:
 * "dayjs": "^1.11.0",
 * "jalaliday": "^1.2.0"
 * 
 * Usage:
 * import { isJalaliEnabled, toDisplay, fromDisplay, getJalaliMonthNames } from './jalali-date-adapter.js'
 */

// Lazy imports to avoid loading unnecessary dependencies
let dayjs = null;
let jalaliday = null;

// Jalali month names in Persian
const JALALI_MONTHS = [
    'فروردین', // Farvardin
    'اردیبهشت', // Ordibehesht  
    'خرداد', // Khordad
    'تیر', // Tir
    'مرداد', // Mordad
    'شهریور', // Shahrivar
    'مهر', // Mehr
    'آبان', // Aban
    'آذر', // Azar
    'دی', // Dey
    'بهمن', // Bahman
    'اسفند' // Esfand
];

// Persian weekday names (Saturday first)
const JALALI_WEEKDAYS = [
    'شنبه', // Saturday
    'یکشنبه', // Sunday
    'دوشنبه', // Monday
    'سه‌شنبه', // Tuesday
    'چهارشنبه', // Wednesday
    'پنج‌شنبه', // Thursday
    'جمعه' // Friday
];

/**
 * Initialize dayjs with jalali support
 * @returns {object} dayjs instance with jalali plugin
 */
async function initDayjs() {
    if (dayjs && jalaliday) {
        return dayjs;
    }
    
    try {
        // Dynamic imports for better bundle splitting
        const dayjsModule = await import('dayjs');
        const jalaliPlugin = await import('jalaliday');
        
        dayjs = dayjsModule.default;
        jalaliday = jalaliPlugin.default;
        
        dayjs.extend(jalaliday);
        
        console.debug('Jalali date adapter: dayjs with jalaliday plugin loaded');
        return dayjs;
    } catch (error) {
        console.warn('Jalali date adapter: Failed to load dayjs/jalaliday, calendar will remain Gregorian', error);
        return null;
    }
}

/**
 * Check if Jalali calendar should be enabled
 * @param {string} currentLocale - Current user locale (e.g., 'fa', 'fa_IR')
 * @param {boolean} userSetting - Optional explicit user preference
 * @returns {boolean} True if Jalali calendar should be used
 */
function isJalaliEnabled(currentLocale = '', userSetting = null) {
    // Explicit user setting takes precedence
    if (userSetting !== null) {
        return userSetting;
    }
    
    // Auto-detect based on locale
    const locale = currentLocale.toLowerCase();
    return locale.startsWith('fa') || locale.includes('persian') || locale.includes('iran');
}

/**
 * Convert Gregorian date to Jalali for display
 * @param {Date|string} gregorianDate - Gregorian date (Date object or ISO string)
 * @returns {object} Jalali date object { year, month, day, dayOfWeek }
 */
async function toDisplay(gregorianDate) {
    const dj = await initDayjs();
    if (!dj) {
        console.warn('Jalali adapter: dayjs not available, returning original date');
        return null;
    }
    
    try {
        const jDate = dj(gregorianDate).calendar('jalali');
        return {
            year: jDate.year(),
            month: jDate.month() + 1, // dayjs months are 0-indexed, Jalali months 1-indexed
            day: jDate.date(),
            dayOfWeek: jDate.day(), // 0=Saturday in Jalali calendar
            formatted: jDate.format('YYYY/MM/DD'),
            monthName: JALALI_MONTHS[jDate.month()],
            weekdayName: JALALI_WEEKDAYS[jDate.day()]
        };
    } catch (error) {
        console.error('Jalali adapter: Error converting to Jalali', error);
        return null;
    }
}

/**
 * Convert Jalali date back to Gregorian for storage
 * @param {object} jalaliDate - Jalali date { year, month, day } or formatted string
 * @returns {Date} Gregorian Date object
 */
async function fromDisplay(jalaliDate) {
    const dj = await initDayjs();
    if (!dj) {
        console.warn('Jalali adapter: dayjs not available, returning current date');
        return new Date();
    }
    
    try {
        let jDate;
        
        if (typeof jalaliDate === 'string') {
            // Parse formatted string like "1403/12/15"
            jDate = dj(jalaliDate, 'YYYY/MM/DD').calendar('jalali');
        } else if (jalaliDate && typeof jalaliDate === 'object') {
            // Parse object { year, month, day }
            jDate = dj()
                .calendar('jalali')
                .year(jalaliDate.year)
                .month(jalaliDate.month - 1) // Convert to 0-indexed
                .date(jalaliDate.day);
        } else {
            throw new Error('Invalid jalali date format');
        }
        
        // Convert back to Gregorian
        return jDate.calendar('gregory').toDate();
    } catch (error) {
        console.error('Jalali adapter: Error converting from Jalali', error);
        return new Date();
    }
}

/**
 * Format a Gregorian date using Jalali calendar
 * @param {Date|string} gregorianDate - Input date
 * @param {string} pattern - Format pattern (e.g., 'YYYY/MM/DD', 'DD MMMM YYYY')
 * @returns {string} Formatted Jalali date string
 */
async function formatJalali(gregorianDate, pattern = 'YYYY/MM/DD') {
    const dj = await initDayjs();
    if (!dj) {
        return new Date(gregorianDate).toLocaleDateString('fa-IR');
    }
    
    try {
        return dj(gregorianDate).calendar('jalali').format(pattern);
    } catch (error) {
        console.error('Jalali adapter: Error formatting date', error);
        return new Date(gregorianDate).toLocaleDateString('fa-IR');
    }
}

/**
 * Get Jalali month names
 * @returns {string[]} Array of Persian month names
 */
function getJalaliMonthNames() {
    return [...JALALI_MONTHS];
}

/**
 * Get Jalali weekday names (Saturday first)
 * @returns {string[]} Array of Persian weekday names
 */
function getJalaliWeekdayNames() {
    return [...JALALI_WEEKDAYS];
}

/**
 * Get first day of week for Jalali calendar (Saturday = 6 in FullCalendar)
 * @returns {number} 6 (Saturday is first day in Persian calendar)
 */
function getJalaliFirstDay() {
    return 6; // Saturday in FullCalendar's 0=Sunday system
}

/**
 * Convert month index between Gregorian and Jalali ordering
 * @param {number} monthIndex - Month index (0-11)
 * @param {boolean} toJalali - If true, convert Greg->Jalali, else Jalali->Greg
 * @returns {number} Converted month index
 */
function convertMonthIndex(monthIndex, toJalali = true) {
    // This is a placeholder - actual conversion would need to account for 
    // the fact that Jalali year starts in March (Farvardin)
    // For now, just return the same index since we're doing full date conversion
    return monthIndex;
}

/**
 * Global flag to enable/disable Jalali mode
 * Can be set from outside: window.NC_CALENDAR_JALALI = true
 */
function setGlobalJalaliFlag(enabled) {
    if (typeof window !== 'undefined') {
        window.NC_CALENDAR_JALALI = enabled;
    }
}

/**
 * Check global Jalali flag
 * @returns {boolean} Current global Jalali setting
 */
function getGlobalJalaliFlag() {
    return typeof window !== 'undefined' ? !!window.NC_CALENDAR_JALALI : false;
}

// Export all functions
export {
    isJalaliEnabled,
    toDisplay,
    fromDisplay,
    formatJalali,
    getJalaliMonthNames,
    getJalaliWeekdayNames,
    getJalaliFirstDay,
    convertMonthIndex,
    setGlobalJalaliFlag,
    getGlobalJalaliFlag,
    JALALI_MONTHS,
    JALALI_WEEKDAYS
};

// Set up graceful fallback logging
window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.message?.includes('jalali')) {
        console.warn('Jalali date adapter: Falling back to Gregorian calendar due to:', event.reason);
        event.preventDefault(); // Don't break the app
    }
});
