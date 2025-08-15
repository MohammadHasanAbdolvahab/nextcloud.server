/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Enhanced FullCalendar locale provider with Jalali calendar support
 * 
 * This is a modified version of the original localeProvider.js that adds
 * Persian/Jalali calendar support while maintaining backward compatibility.
 * 
 * Usage:
 * 1. Replace the original import in CalendarGrid component
 * 2. The function automatically detects Persian locale and switches to Jalali mode
 * 3. Provides Jalali month names, proper first day (Saturday), and date formatting
 */

import { translate as t, getLanguage, getFirstDay } from '@nextcloud/l10n'
import { 
    isJalaliEnabled, 
    getJalaliMonthNames, 
    getJalaliWeekdayNames,
    getJalaliFirstDay,
    getGlobalJalaliFlag 
} from './jalali-date-adapter.js'

/**
 * Returns localization settings for the FullCalendar package with Jalali support
 * 
 * @see https://fullcalendar.io/docs
 * @return {object} FullCalendar locale configuration
 */
const getFullCalendarLocale = () => {
    const currentLocale = getLanguage()
    const jalaliEnabled = getGlobalJalaliFlag() || isJalaliEnabled(currentLocale)
    
    // Base configuration (Gregorian)
    const baseConfig = {
        locale: currentLocale,
        // TRANSLATORS W is an abbreviation for Week
        weekText: t('calendar', 'W'),
        allDayText: t('calendar', 'All day'),
        moreLinkText: (n) => t('calendar', '%n more', {}, n),
        noEventsText: t('calendar', 'No events to display'),
    }
    
    if (jalaliEnabled) {
        // Jalali calendar configuration
        console.debug('FullCalendar: Using Jalali calendar configuration')
        
        return {
            ...baseConfig,
            firstDay: getJalaliFirstDay(), // Saturday = 6
            // Override locale to force Persian formatting 
            locale: 'fa',
            // Persian month names (will be used by FullCalendar for navigation)
            monthNames: getJalaliMonthNames(),
            monthNamesShort: getJalaliMonthNames().map(name => name.substring(0, 3)),
            // Persian day names (Saturday first)
            dayNames: getJalaliWeekdayNames(),
            dayNamesShort: getJalaliWeekdayNames().map(name => name.substring(0, 3)),
            // Persian week text
            weekText: 'ه', // Persian abbreviation for week (هفته)
            // Custom button text for Persian
            buttonText: {
                today: 'امروز',
                month: 'ماه',
                week: 'هفته',
                day: 'روز',
                list: 'فهرست'
            },
            // Persian all-day text
            allDayText: 'تمام روز',
            // No events text in Persian
            noEventsText: 'رویدادی برای نمایش وجود ندارد',
            // More link text in Persian
            moreLinkText: (n) => `${n} مورد بیشتر`,
            // Right-to-left direction
            direction: 'rtl',
            // Persian time format
            eventTimeFormat: {
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            }
        }
    } else {
        // Standard Gregorian configuration
        return {
            ...baseConfig,
            firstDay: getFirstDay()
        }
    }
}

/**
 * Get enhanced FullCalendar locale configuration for Jalali calendar
 * This function provides additional Jalali-specific configurations
 * 
 * @return {object} Extended configuration for Jalali calendar
 */
const getJalaliFullCalendarConfig = () => {
    return {
        // Jalali view configurations
        views: {
            dayGridMonth: {
                // Custom month title format for Jalali
                titleFormat: { year: 'numeric', month: 'long' }
            },
            timeGridWeek: {
                // Custom week title format
                titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
            },
            timeGridDay: {
                // Custom day title format  
                titleFormat: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
            },
            listWeek: {
                // List view customizations
                listDayFormat: { weekday: 'long', month: 'long', day: 'numeric' }
            }
        },
        
        // Persian number formatting
        eventContent: function(arg) {
            // Convert numbers to Persian if needed
            // This is a placeholder - actual implementation would convert
            // Latin numbers (1234) to Persian numbers (۱۲۳۴)
            return null; // Let FullCalendar handle default rendering
        },
        
        // Custom date formatting for Persian calendar
        dayCellContent: function(arg) {
            // Placeholder for custom day cell rendering with Jalali dates
            return null; // Use default for now
        }
    }
}

export {
    getFullCalendarLocale,
    getJalaliFullCalendarConfig
}
