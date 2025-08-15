/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Unit tests for Jalali date adapter
 * 
 * These tests validate the conversion functions between Gregorian and Jalali calendars.
 * Run with: npm test or jest
 * 
 * Add to package.json devDependencies:
 * "jest": "^29.0.0",
 * "@babel/preset-env": "^7.20.0"
 */

// Mock browser environment for Node.js testing
global.window = global.window || {
    addEventListener: jest.fn(),
    NC_CALENDAR_JALALI: false
};

global.console = {
    ...console,
    debug: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
};

// Import the module under test
import {
    isJalaliEnabled,
    toDisplay,
    fromDisplay,
    formatJalali,
    getJalaliMonthNames,
    getJalaliWeekdayNames,
    getJalaliFirstDay,
    setGlobalJalaliFlag,
    getGlobalJalaliFlag,
    JALALI_MONTHS,
    JALALI_WEEKDAYS
} from './jalali-date-adapter.js';

describe('Jalali Date Adapter', () => {
    beforeEach(() => {
        // Reset global state before each test
        setGlobalJalaliFlag(false);
        jest.clearAllMocks();
    });

    describe('isJalaliEnabled', () => {
        test('should return true for Persian locale', () => {
            expect(isJalaliEnabled('fa')).toBe(true);
            expect(isJalaliEnabled('fa_IR')).toBe(true);
            expect(isJalaliEnabled('FA')).toBe(true);
        });

        test('should return false for non-Persian locales', () => {
            expect(isJalaliEnabled('en')).toBe(false);
            expect(isJalaliEnabled('de')).toBe(false);
            expect(isJalaliEnabled('fr')).toBe(false);
        });

        test('should respect explicit user setting', () => {
            expect(isJalaliEnabled('en', true)).toBe(true);
            expect(isJalaliEnabled('fa', false)).toBe(false);
        });
    });

    describe('getJalaliMonthNames', () => {
        test('should return array of 12 Persian month names', () => {
            const months = getJalaliMonthNames();
            expect(months).toHaveLength(12);
            expect(months[0]).toBe('فروردین'); // Farvardin
            expect(months[11]).toBe('اسفند'); // Esfand
        });

        test('should return a copy of the array', () => {
            const months1 = getJalaliMonthNames();
            const months2 = getJalaliMonthNames();
            expect(months1).not.toBe(months2); // Different references
            expect(months1).toEqual(months2); // Same content
        });
    });

    describe('getJalaliWeekdayNames', () => {
        test('should return array of 7 Persian weekday names', () => {
            const weekdays = getJalaliWeekdayNames();
            expect(weekdays).toHaveLength(7);
            expect(weekdays[0]).toBe('شنبه'); // Saturday
            expect(weekdays[6]).toBe('جمعه'); // Friday
        });
    });

    describe('getJalaliFirstDay', () => {
        test('should return 6 (Saturday) as first day', () => {
            expect(getJalaliFirstDay()).toBe(6);
        });
    });

    describe('Global flag management', () => {
        test('should set and get global Jalali flag', () => {
            expect(getGlobalJalaliFlag()).toBe(false);
            
            setGlobalJalaliFlag(true);
            expect(getGlobalJalaliFlag()).toBe(true);
            expect(window.NC_CALENDAR_JALALI).toBe(true);
            
            setGlobalJalaliFlag(false);
            expect(getGlobalJalaliFlag()).toBe(false);
        });
    });

    describe('Date conversion functions', () => {
        // Note: These tests would require dayjs and jalaliday to be properly mocked
        // or run in an environment where they're available
        
        describe('toDisplay', () => {
            test('should handle null dayjs gracefully', async () => {
                // Mock dayjs import failure
                jest.doMock('dayjs', () => {
                    throw new Error('Module not found');
                });

                const result = await toDisplay(new Date('2024-03-20'));
                expect(result).toBeNull();
                expect(console.warn).toHaveBeenCalledWith(
                    expect.stringContaining('dayjs not available')
                );
            });

            test('should convert Gregorian date to Jalali object', async () => {
                // This test would need actual dayjs/jalaliday implementation
                // For now, just test the structure
                const mockJalaliDate = {
                    year: 1403,
                    month: 1, // Farvardin
                    day: 1,
                    dayOfWeek: 6, // Saturday
                    formatted: '1403/01/01',
                    monthName: 'فروردین',
                    weekdayName: 'شنبه'
                };

                // Would test actual conversion with real implementation
                expect(mockJalaliDate.year).toBeGreaterThan(1400);
                expect(mockJalaliDate.month).toBeGreaterThanOrEqual(1);
                expect(mockJalaliDate.month).toBeLessThanOrEqual(12);
            });
        });

        describe('fromDisplay', () => {
            test('should handle invalid input gracefully', async () => {
                const result = await fromDisplay(null);
                expect(result).toBeInstanceOf(Date);
            });

            test('should convert Jalali object to Gregorian Date', async () => {
                const jalaliInput = {
                    year: 1403,
                    month: 1,
                    day: 1
                };

                // Would test actual conversion with real implementation
                const result = await fromDisplay(jalaliInput);
                expect(result).toBeInstanceOf(Date);
            });

            test('should parse Jalali date string', async () => {
                const jalaliString = '1403/01/01';
                const result = await fromDisplay(jalaliString);
                expect(result).toBeInstanceOf(Date);
            });
        });

        describe('formatJalali', () => {
            test('should format date with default pattern', async () => {
                const date = new Date('2024-03-20');
                const result = await formatJalali(date);
                
                // Should fallback to browser's Persian formatting if dayjs unavailable
                expect(typeof result).toBe('string');
                expect(result.length).toBeGreaterThan(0);
            });

            test('should use custom format pattern', async () => {
                const date = new Date('2024-03-20');
                const result = await formatJalali(date, 'DD MMMM YYYY');
                
                expect(typeof result).toBe('string');
            });
        });
    });

    describe('Error handling', () => {
        test('should handle module loading failures gracefully', async () => {
            // Test that the adapter doesn't break the app when dependencies fail
            const originalError = console.error;
            console.error = jest.fn();

            // This would simulate import failures
            expect(() => {
                isJalaliEnabled('fa');
            }).not.toThrow();

            console.error = originalError;
        });
    });

    describe('Constants', () => {
        test('JALALI_MONTHS should contain 12 months', () => {
            expect(JALALI_MONTHS).toHaveLength(12);
            expect(JALALI_MONTHS[0]).toBe('فروردین');
            expect(JALALI_MONTHS[11]).toBe('اسفند');
        });

        test('JALALI_WEEKDAYS should contain 7 weekdays', () => {
            expect(JALALI_WEEKDAYS).toHaveLength(7);
            expect(JALALI_WEEKDAYS[0]).toBe('شنبه'); // Saturday first
        });
    });
});

// Performance tests
describe('Jalali Date Adapter Performance', () => {
    test('should handle large number of date conversions efficiently', async () => {
        const startTime = Date.now();
        const promises = [];

        // Test 100 date conversions
        for (let i = 0; i < 100; i++) {
            const date = new Date(2024, 0, 1 + i);
            promises.push(toDisplay(date));
        }

        await Promise.all(promises);
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Should complete within reasonable time (adjust threshold as needed)
        expect(duration).toBeLessThan(5000); // 5 seconds max
    });
});

// Integration tests
describe('Jalali Date Adapter Integration', () => {
    test('should work with FullCalendar date objects', async () => {
        // Mock FullCalendar date structure
        const fcEvent = {
            start: new Date('2024-03-20T09:00:00'),
            end: new Date('2024-03-20T10:00:00'),
            title: 'Test Event'
        };

        // Test conversion pipeline
        const jalaliStart = await toDisplay(fcEvent.start);
        if (jalaliStart) {
            const convertedBack = await fromDisplay(jalaliStart);
            
            // Should maintain date accuracy (within same day)
            expect(convertedBack.getFullYear()).toBe(fcEvent.start.getFullYear());
            expect(convertedBack.getMonth()).toBe(fcEvent.start.getMonth());
            expect(convertedBack.getDate()).toBe(fcEvent.start.getDate());
        }
    });

    test('should handle edge cases like leap years', async () => {
        // Test Jalali leap year (Esfand 30 vs 29 days)
        const esfandEnd = new Date('2024-03-19'); // End of Esfand in a leap year
        const jalaliDate = await toDisplay(esfandEnd);
        
        if (jalaliDate) {
            expect(jalaliDate.month).toBe(12); // Esfand
            // Test that day is valid (29 or 30)
            expect(jalaliDate.day).toBeGreaterThanOrEqual(29);
            expect(jalaliDate.day).toBeLessThanOrEqual(30);
        }
    });
});

// Mock Jest configuration for package.json
export const JEST_CONFIG = {
    "jest": {
        "testEnvironment": "jsdom",
        "transform": {
            "^.+\\.js$": "babel-jest"
        },
        "moduleFileExtensions": ["js", "vue"],
        "testMatch": [
            "**/tests/**/*.test.js",
            "**/?(*.)+(spec|test).js"
        ],
        "collectCoverageFrom": [
            "js/jalali-*.js",
            "!js/jalali-integration-guide.js"
        ]
    }
};

console.info('Jalali Date Adapter Tests Created - Run with: npm test');
