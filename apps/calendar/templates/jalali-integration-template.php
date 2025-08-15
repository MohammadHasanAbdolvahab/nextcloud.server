<!--
SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
SPDX-License-Identifier: AGPL-3.0-or-later
-->

<!--
Integration Template for Jalali Calendar Support in Nextcloud

This template shows how to integrate the Jalali calendar scripts into 
the Nextcloud Calendar app templates.

Add to: apps/calendar/templates/*.php files
-->

<!-- Include Jalali Calendar Integration Scripts -->
<script type="text/javascript">
    // Enable Jalali calendar for Persian users
    window.NC_CALENDAR_JALALI = <?php echo ($_['locale'] === 'fa' || strpos($_['locale'], 'fa_') === 0) ? 'true' : 'false'; ?>;
</script>

<!-- Load the browser-compatible Jalali integration -->
<script defer src="<?php echo $_['webroot']; ?>/apps/calendar/js/jalali-browser-integration.js"></script>

<!-- Advanced integration with dayjs (if available) -->
<script defer src="<?php echo $_['webroot']; ?>/apps/calendar/js/jalali-date-adapter.js"></script>
<script defer src="<?php echo $_['webroot']; ?>/apps/calendar/js/jalali-fullcalendar-locale.js"></script>

<!-- Manual enablement option -->
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        // Check user preference for Jalali calendar
        const userLocale = <?php echo json_encode($_['locale']); ?>;
        const useJalali = userLocale.startsWith('fa') || 
                         localStorage.getItem('nextcloud.calendar.useJalali') === 'true';
        
        if (useJalali && window.JalaliCalendar) {
            console.info('🎌 Enabling Jalali Calendar for user locale:', userLocale);
            window.JalaliCalendar.enable();
            
            // Add Jalali class to calendar container
            setTimeout(() => {
                const calendarEl = document.querySelector('.fc');
                if (calendarEl) {
                    calendarEl.classList.add('calendar-jalali', 'fc-direction-rtl');
                }
            }, 1000);
        }
    });
</script>

<!-- CSS for Jalali Calendar Enhancement -->
<style>
    .calendar-jalali {
        direction: rtl;
    }
    
    .calendar-jalali .fc-toolbar {
        direction: rtl;
    }
    
    .calendar-jalali .fc-button-group {
        direction: ltr; /* Keep button groups LTR */
    }
    
    .calendar-jalali .fc-daygrid-day-number {
        text-align: right;
    }
    
    .calendar-jalali .fc-col-header-cell {
        text-align: center;
    }
    
    .calendar-jalali .fc-event-title {
        direction: rtl;
        text-align: right;
    }
    
    /* Jalali month navigation styling */
    .calendar-jalali .fc-toolbar-title {
        font-family: 'Vazir', 'Tahoma', 'Arial', sans-serif;
        direction: rtl;
    }
    
    /* Week view enhancements */
    .calendar-jalali .fc-timegrid-slot-label {
        text-align: left; /* Keep time labels LTR */
    }
    
    /* Event styling for RTL */
    .calendar-jalali .fc-event {
        direction: rtl;
    }
    
    .calendar-jalali .fc-event-main {
        direction: rtl;
        text-align: right;
    }
</style>

<!-- Alternative approach: CSS-only month name replacement -->
<style>
    /* CSS-based month name replacement for specific elements */
    .calendar-jalali .fc-toolbar-title:not([data-jalali])::after {
        content: attr(data-jalali-month) " " attr(data-jalali-year);
        position: absolute;
        background: white;
        width: 100%;
        left: 0;
        text-align: center;
    }
    
    .calendar-jalali .fc-toolbar-title:not([data-jalali]) {
        position: relative;
        color: transparent;
    }
</style>

<!-- Optional: Settings toggle for users -->
<div id="jalali-calendar-toggle" style="display: none;">
    <input type="checkbox" id="use-jalali-calendar" />
    <label for="use-jalali-calendar">
        استفاده از تقویم جلالی (Use Jalali Calendar)
    </label>
</div>

<script>
    // Show toggle for Persian users
    document.addEventListener('DOMContentLoaded', function() {
        const userLocale = <?php echo json_encode($_['locale']); ?>;
        if (userLocale.startsWith('fa')) {
            const toggle = document.getElementById('jalali-calendar-toggle');
            if (toggle) {
                toggle.style.display = 'block';
                
                const checkbox = document.getElementById('use-jalali-calendar');
                checkbox.checked = localStorage.getItem('nextcloud.calendar.useJalali') === 'true';
                
                checkbox.addEventListener('change', function() {
                    localStorage.setItem('nextcloud.calendar.useJalali', this.checked);
                    if (window.JalaliCalendar) {
                        if (this.checked) {
                            window.JalaliCalendar.enable();
                        } else {
                            window.JalaliCalendar.disable();
                        }
                        // Reload calendar to apply changes
                        location.reload();
                    }
                });
            }
        }
    });
</script>
