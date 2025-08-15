/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Integration patch for CalendarGrid component to add Jalali calendar support
 * 
 * This file shows the modifications needed in the main CalendarGrid component
 * to integrate Jalali calendar functionality.
 * 
 * IMPLEMENTATION STEPS:
 * 
 * 1. In apps/calendar/js/calendar-main.js (or the source equivalent):
 *    - Add import for Jalali adapter
 *    - Modify FullCalendar options to use Jalali dates when enabled
 *    - Add date conversion logic for event sources
 * 
 * 2. Add dependency to package.json:
 *    "dayjs": "^1.11.0",
 *    "jalaliday": "^1.2.0"
 * 
 * 3. Modify getFullCalendarLocale() function to return Jalali-aware configuration
 */

// PATCH 1: Import Jalali date adapter (add to imports section)
/*
import { 
    isJalaliEnabled, 
    toDisplay, 
    fromDisplay, 
    formatJalali,
    getJalaliFirstDay,
    setGlobalJalaliFlag,
    getGlobalJalaliFlag
} from './jalali-date-adapter.js'

// Enhanced locale provider with Jalali support
import { getFullCalendarLocale } from './jalali-fullcalendar-locale.js'
*/

// PATCH 2: Modify CalendarGrid component data() method
/*
data: () => ({
    updateTodayJob: null,
    updateTodayJobPreviousDate: null,
    // Add Jalali-specific state
    jalaliEnabled: false,
    dateAdapter: null
}),
*/

// PATCH 3: Add Jalali detection in computed properties
/*
computed: {
    // ... existing computed properties
    
    jalaliMode() {
        // Check if current locale is Persian or user has enabled Jalali
        const currentLocale = this.$i18n?.locale || this.locale || 'en'
        return getGlobalJalaliFlag() || isJalaliEnabled(currentLocale)
    },
    
    // Enhanced options with Jalali support
    options() {
        const baseOptions = {
            // Initialization:
            initialDate: this.getInitialDate(),
            initialView: this.$route?.params.view ?? 'dayGridMonth',
            // Data
            eventSources: this.jalaliMode ? this.jalaliEventSources : this.eventSources,
            // ... rest of existing options
        }
        
        // Apply Jalali modifications if enabled
        if (this.jalaliMode) {
            return {
                ...baseOptions,
                ...this.getJalaliOptions()
            }
        }
        
        return baseOptions
    },
    
    // Convert event sources for Jalali display
    jalaliEventSources() {
        if (!this.jalaliMode) {
            return this.eventSources
        }
        
        // Wrap event sources to convert dates
        return this.eventSources.map(source => ({
            ...source,
            eventDataTransform: this.jalaliEventDataTransform
        }))
    }
},
*/

// PATCH 4: Add Jalali-specific methods
/*
methods: {
    // ... existing methods
    
    // Get initial date with Jalali support
    getInitialDate() {
        const routeDate = this.$route?.params?.firstDay ?? 'now'
        
        if (this.jalaliMode && routeDate !== 'now') {
            // Convert Jalali route date to Gregorian for FullCalendar
            return this.convertJalaliRouteDate(routeDate)
        }
        
        return this.getYYYYMMDDFromFirstdayParam(routeDate)
    },
    
    // Convert Jalali route date to Gregorian
    async convertJalaliRouteDate(jalaliDateStr) {
        try {
            const gregorianDate = await fromDisplay(jalaliDateStr)
            return gregorianDate
        } catch (error) {
            console.warn('Failed to convert Jalali route date:', error)
            return new Date() // Fallback to today
        }
    },
    
    // Get Jalali-specific FullCalendar options
    getJalaliOptions() {
        return {
            // Use Jalali locale configuration
            ...getFullCalendarLocale(),
            
            // Custom date rendering for Jalali
            dayCellContent: this.jalaliDayCellContent,
            dayHeaderContent: this.jalaliDayHeaderContent,
            
            // Custom navigation handling
            datesSet: this.jalaliDatesSet,
            
            // Custom event rendering with Jalali dates
            eventContent: this.jalaliEventContent,
            
            // Right-to-left layout for Persian
            direction: 'rtl'
        }
    },
    
    // Transform event data to display Jalali dates
    async jalaliEventDataTransform(eventData) {
        try {
            // Convert start/end dates to Jalali for display
            if (eventData.start) {
                const jalaliStart = await toDisplay(eventData.start)
                eventData._jalaliStart = jalaliStart
            }
            
            if (eventData.end) {
                const jalaliEnd = await toDisplay(eventData.end)
                eventData._jalaliEnd = jalaliEnd
            }
            
            return eventData
        } catch (error) {
            console.warn('Failed to transform event data for Jalali:', error)
            return eventData
        }
    },
    
    // Custom day cell content for Jalali calendar
    jalaliDayCellContent(arg) {
        if (!this.jalaliMode) return null
        
        // This will be called by FullCalendar for each day cell
        // arg.date contains the Gregorian date, we need to convert to Jalali
        this.convertAndDisplayJalaliDate(arg.date)
            .then(jalaliDate => {
                if (jalaliDate && arg.el) {
                    // Update the day number display
                    const dayNumberEl = arg.el.querySelector('.fc-daygrid-day-number')
                    if (dayNumberEl) {
                        dayNumberEl.textContent = this.convertToPersinNumbers(jalaliDate.day)
                    }
                }
            })
            .catch(error => {
                console.warn('Failed to render Jalali day cell:', error)
            })
        
        return null // Let FullCalendar handle default rendering
    },
    
    // Custom day header content for Jalali calendar
    jalaliDayHeaderContent(arg) {
        if (!this.jalaliMode) return null
        
        // Convert weekday names to Persian
        const jalaliWeekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] // Short Persian weekday names
        const dayOfWeek = arg.date.getDay()
        
        return {
            html: `<span class="jalali-weekday">${jalaliWeekdays[dayOfWeek]}</span>`
        }
    },
    
    // Handle date set changes for Jalali calendar
    async jalaliDatesSet(dateInfo) {
        if (!this.jalaliMode) return
        
        // Convert the visible date range to Jalali and update navigation
        try {
            const jalaliStart = await toDisplay(dateInfo.start)
            const jalaliEnd = await toDisplay(dateInfo.end)
            
            // Update any Jalali-specific UI elements
            this.updateJalaliNavigation(jalaliStart, jalaliEnd)
        } catch (error) {
            console.warn('Failed to handle Jalali dates set:', error)
        }
    },
    
    // Custom event content rendering for Jalali
    jalaliEventContent(arg) {
        if (!this.jalaliMode || !arg.event.extendedProps._jalaliStart) {
            return null // Use default rendering
        }
        
        // Custom rendering with Jalali dates
        const jalaliStart = arg.event.extendedProps._jalaliStart
        
        return {
            html: `
                <div class="jalali-event">
                    <div class="jalali-event-time">${this.formatJalaliTime(jalaliStart)}</div>
                    <div class="jalali-event-title">${arg.event.title}</div>
                </div>
            `
        }
    },
    
    // Convert numbers to Persian numerals
    convertToPersinNumbers(number) {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
        return String(number).replace(/\d/g, d => persianNumbers[d])
    },
    
    // Format Jalali time
    formatJalaliTime(jalaliDate) {
        // Format time in Persian style
        return `${this.convertToPersinNumbers(jalaliDate.hour)}:${this.convertToPersinNumbers(jalaliDate.minute)}`
    },
    
    // Update navigation elements with Jalali dates
    updateJalaliNavigation(jalaliStart, jalaliEnd) {
        // Update month/year display in navigation
        // This would typically update app-navigation or header elements
        this.$emit('jalali-navigation-update', {
            start: jalaliStart,
            end: jalaliEnd
        })
    },
    
    // Convert and display Jalali date
    async convertAndDisplayJalaliDate(gregorianDate) {
        try {
            return await toDisplay(gregorianDate)
        } catch (error) {
            console.warn('Failed to convert date to Jalali:', error)
            return null
        }
    }
}
*/

// PATCH 5: Add Jalali detection in created() lifecycle
/*
async created() {
    // ... existing created() code
    
    // Initialize Jalali mode
    const currentLocale = this.$i18n?.locale || this.locale || 'en'
    this.jalaliEnabled = isJalaliEnabled(currentLocale)
    
    if (this.jalaliEnabled) {
        console.debug('CalendarGrid: Jalali calendar mode enabled')
        setGlobalJalaliFlag(true)
        
        // Pre-load Jalali adapter
        try {
            await import('./jalali-date-adapter.js')
            console.debug('CalendarGrid: Jalali date adapter loaded')
        } catch (error) {
            console.warn('CalendarGrid: Failed to load Jalali adapter, using Gregorian fallback:', error)
            this.jalaliEnabled = false
            setGlobalJalaliFlag(false)
        }
    }
}
*/

// PATCH 6: Add Jalali CSS classes
/*
<style lang="scss" scoped>
// ... existing styles

// Jalali calendar specific styles
.jalali-event {
    .jalali-event-time {
        font-size: 0.8em;
        color: var(--color-text-lighter);
        direction: rtl;
    }
    
    .jalali-event-title {
        direction: rtl;
        text-align: right;
    }
}

.jalali-weekday {
    direction: rtl;
    font-weight: bold;
}

// RTL layout adjustments for Jalali mode
:deep(.fc[dir="rtl"]) {
    .fc-toolbar {
        flex-direction: row-reverse;
    }
    
    .fc-button-group {
        flex-direction: row-reverse;
    }
    
    .fc-daygrid-day-number {
        direction: rtl;
    }
}
</style>
*/

export const INTEGRATION_GUIDE = `
INTEGRATION CHECKLIST:

1. ✅ Created jalali-date-adapter.js - Core Jalali date conversion functions
2. ✅ Created jalali-fullcalendar-locale.js - Enhanced FullCalendar locale provider  
3. ⏳ Modify CalendarGrid component (this file shows the patches needed)
4. ⏳ Add dayjs + jalaliday dependencies to package.json
5. ⏳ Update app-navigation component to show Jalali month names
6. ⏳ Add user preference for Jalali calendar in settings
7. ⏳ Add Jalali date picker component
8. ⏳ Add unit tests for date conversions

NEXT STEPS:
1. Apply the patches shown in this file to calendar-main.js or the source component
2. Add dependencies: npm install dayjs jalaliday
3. Test with Persian locale (fa, fa_IR)
4. Add feature flag in settings for manual toggle

TESTING:
- Set browser/Nextcloud locale to Persian (fa)
- Calendar should automatically switch to Jalali mode
- Saturday should be first day of week
- Month names should show in Persian (فروردین, اردیبهشت, etc.)
- Week view and day view should show Jalali dates
- All storage/API calls should remain Gregorian (ISO 8601)

FALLBACK BEHAVIOR:
- If dayjs/jalaliday fails to load, calendar continues in Gregorian mode
- All errors are logged to console but don't break the calendar
- User can manually disable Jalali mode via feature flag
`;

console.info(INTEGRATION_GUIDE);
