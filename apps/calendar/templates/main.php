<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
script('calendar', 'calendar-main');

// Jalali Calendar Integration
$userLocale = \OC::$server->getL10NFactory()->get('core')->getLanguageCode();
$isPersinaLocale = ($userLocale === 'fa' || strpos($userLocale, 'fa_') === 0);
?>

<!-- Jalali Calendar Integration -->
<script type="text/javascript">
    window.NC_CALENDAR_JALALI = <?php echo $isPersinaLocale ? 'true' : 'false'; ?>;
</script>

<?php if ($isPersinaLocale): ?>
    <!-- Load Jalali calendar scripts for Persian users -->
    <script defer src="<?php echo \OC::$WEBROOT; ?>/apps/calendar/js/jalali-browser-integration.js"></script>
    <script defer src="<?php echo \OC::$WEBROOT; ?>/apps/calendar/js/jalali-date-adapter.js"></script>
    <script defer src="<?php echo \OC::$WEBROOT; ?>/apps/calendar/js/jalali-fullcalendar-locale.js"></script>
    
    <!-- Jalali Calendar CSS -->
    <style>
        .calendar-jalali {
            direction: rtl;
        }
        
        .calendar-jalali .fc-toolbar {
            direction: rtl;
        }
        
        .calendar-jalali .fc-button-group {
            direction: ltr;
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
        
        .calendar-jalali .fc-toolbar-title {
            font-family: 'Vazir', 'Tahoma', 'Arial', sans-serif;
            direction: rtl;
        }
        
        .calendar-jalali .fc-event {
            direction: rtl;
        }
        
        .calendar-jalali .fc-event-main {
            direction: rtl;
            text-align: right;
        }
    </style>
    
    <!-- Auto-enable Jalali calendar for Persian users -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (window.JalaliCalendar) {
                console.info('🎌 Auto-enabling Jalali Calendar for Persian locale');
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
<?php endif; ?>
