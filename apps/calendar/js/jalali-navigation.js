/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * App Navigation Jalali Integration
 * 
 * This shows how to modify the app-navigation component to display
 * Jalali month names instead of Gregorian months when Jalali mode is active.
 * 
 * The navigation sidebar typically shows a month picker or mini calendar.
 * These modifications will make it Jalali-aware.
 */

import { 
    getJalaliMonthNames, 
    isJalaliEnabled, 
    getGlobalJalaliFlag,
    toDisplay 
} from './jalali-date-adapter.js'

/**
 * Enhanced month name provider for app navigation
 * Returns Jalali month names when Jalali mode is active
 * 
 * @param {string} currentLocale - Current user locale
 * @returns {string[]} Array of month names (Gregorian or Jalali)
 */
export function getNavigationMonthNames(currentLocale = 'en') {
    const jalaliEnabled = getGlobalJalaliFlag() || isJalaliEnabled(currentLocale)
    
    if (jalaliEnabled) {
        return getJalaliMonthNames()
    }
    
    // Return standard Gregorian month names
    // This would typically come from @nextcloud/l10n
    return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
}

/**
 * Convert month index for navigation
 * When in Jalali mode, month 0 = Farvardin, month 11 = Esfand
 * 
 * @param {number} monthIndex - Month index (0-11)
 * @param {boolean} jalaliMode - Whether Jalali mode is active
 * @returns {string} Month name for display
 */
export function getMonthNameForNavigation(monthIndex, jalaliMode = false) {
    const monthNames = jalaliMode ? getJalaliMonthNames() : getNavigationMonthNames()
    return monthNames[monthIndex] || monthNames[0]
}

/**
 * Generate calendar navigation data with Jalali support
 * This function would be used by the app-navigation component
 * 
 * @param {Date} currentDate - Current displayed date
 * @param {string} locale - User locale
 * @returns {object} Navigation data with month/year info
 */
export async function generateNavigationData(currentDate, locale = 'en') {
    const jalaliEnabled = getGlobalJalaliFlag() || isJalaliEnabled(locale)
    
    if (jalaliEnabled) {
        try {
            const jalaliDate = await toDisplay(currentDate)
            
            return {
                isJalali: true,
                year: jalaliDate.year,
                month: jalaliDate.month - 1, // Convert to 0-indexed for consistency
                monthName: jalaliDate.monthName,
                monthNames: getJalaliMonthNames(),
                weekdayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
                firstDayOfWeek: 6, // Saturday
                direction: 'rtl'
            }
        } catch (error) {
            console.warn('Failed to generate Jalali navigation data:', error)
            // Fallback to Gregorian
        }
    }
    
    // Standard Gregorian navigation data
    return {
        isJalali: false,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth(),
        monthName: currentDate.toLocaleDateString(locale, { month: 'long' }),
        monthNames: getNavigationMonthNames(locale),
        weekdayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        firstDayOfWeek: 0, // Sunday
        direction: 'ltr'
    }
}

/**
 * PATCH FOR APP-NAVIGATION COMPONENT:
 * 
 * In the app-navigation Vue component, modify the computed properties:
 */
/*
// Add to computed properties in app-navigation component:
computed: {
    // ... existing computed properties
    
    async navigationData() {
        return await generateNavigationData(this.currentDate, this.locale)
    },
    
    monthNames() {
        if (this.navigationData?.isJalali) {
            return this.navigationData.monthNames
        }
        return this.getStandardMonthNames() // existing method
    },
    
    currentMonthName() {
        if (this.navigationData?.isJalali) {
            return this.navigationData.monthName
        }
        return this.getCurrentMonthName() // existing method
    }
},

// Add to template:
<template>
    <div class="app-navigation" :dir="navigationData?.direction || 'ltr'">
        <!-- Month selector with Jalali support -->
        <div class="month-selector" :class="{ 'jalali-mode': navigationData?.isJalali }">
            <h3>{{ currentMonthName }} {{ navigationData?.year }}</h3>
            
            <!-- Month grid -->
            <div class="month-grid">
                <div 
                    v-for="(monthName, index) in monthNames" 
                    :key="index"
                    class="month-item"
                    :class="{ 'current': index === navigationData?.month }"
                    @click="selectMonth(index)"
                >
                    {{ monthName }}
                </div>
            </div>
        </div>
    </div>
</template>

// Add to styles:
<style lang="scss" scoped>
.app-navigation {
    .month-selector {
        padding: 16px;
        
        &.jalali-mode {
            direction: rtl;
            text-align: right;
            
            .month-grid {
                direction: rtl;
            }
            
            .month-item {
                font-family: 'IRANSans', 'Tahoma', sans-serif; // Persian font
            }
        }
    }
    
    .month-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin-top: 12px;
    }
    
    .month-item {
        padding: 8px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
            background-color: var(--color-background-hover);
        }
        
        &.current {
            background-color: var(--color-primary);
            color: var(--color-primary-text);
        }
    }
}
</style>

// Add to methods:
methods: {
    // ... existing methods
    
    async selectMonth(monthIndex) {
        if (this.navigationData?.isJalali) {
            // Convert Jalali month selection to Gregorian date for routing
            const jalaliYear = this.navigationData.year
            const jalaliMonth = monthIndex + 1 // Convert to 1-indexed
            
            try {
                const gregorianDate = await fromDisplay({
                    year: jalaliYear,
                    month: jalaliMonth,
                    day: 1
                })
                
                // Navigate to the Gregorian equivalent date
                this.$router.push({
                    name: this.$route.name,
                    params: {
                        ...this.$route.params,
                        firstDay: gregorianDate.toISOString().split('T')[0]
                    }
                })
            } catch (error) {
                console.warn('Failed to convert Jalali month selection:', error)
            }
        } else {
            // Standard Gregorian month selection
            const newDate = new Date(this.navigationData.year, monthIndex, 1)
            this.navigateToDate(newDate) // existing method
        }
    }
}
*/

// Example usage in a component
export const NAVIGATION_INTEGRATION_EXAMPLE = `
// In your navigation component:
import { generateNavigationData, getNavigationMonthNames } from './jalali-navigation.js'

export default {
    data() {
        return {
            currentDate: new Date(),
            navData: null
        }
    },
    
    async created() {
        this.navData = await generateNavigationData(this.currentDate, this.$i18n?.locale)
        console.log('Navigation data:', this.navData)
        
        if (this.navData.isJalali) {
            console.log('Jalali mode active - months:', this.navData.monthNames)
        }
    }
}
`;

console.info('Jalali Navigation Integration Guide Created');
