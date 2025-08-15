<?php
/**
 * SPDX-FileCopyrightText: 2025 SEPEHR Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * SEPEHR Material Design Theme for Nextcloud
 * A modern Persian-friendly theme with RTL support
 */
class OC_Theme {

    /**
     * Returns the base URL for the theme
     */
    public function getBaseUrl() {
        return OC::$WEBROOT . '/themes/sepehr';
    }

    /**
     * Returns the URL for theme documentation
     */
    public function getDocBaseUrl() {
        return 'https://github.com/nextcloud/server';
    }

    /**
     * Returns the theme title
     */
    public function getTitle() {
        return 'اکو سیستم سپهر'; // SEPEHR Ecosystem in Persian
    }

    /**
     * Returns the short name of the theme
     */
    public function getName() {
        return 'سپهر'; // SEPEHR in Persian
    }

    /**
     * Returns the theme entity
     */
    public function getEntity() {
        return 'اکو سیستم سپهر'; // SEPEHR Ecosystem in Persian
    }

    /**
     * Returns the theme slogan
     */
    public function getSlogan() {
        return 'ابری امن و هوشمند'; // Safe and Smart Cloud in Persian
    }

    /**
     * Returns the short footer text
     */
    public function getShortFooter() {
        return 'اکو سیستم سپهر - توان گرفته از مرکز بهشتی نژاد';
    }

    /**
     * Returns the long footer text
     */
    public function getLongFooter() {
        return 'اکو سیستم سپهر - پلتفرم ابری امن و هوشمند با پشتیبانی کامل از زبان فارسی و طراحی راست‌چین - توان گرفته از مرکز بهشتی نژاد';
    }

    /**
     * Generate a documentation link
     */
    public function buildDocLinkToKey($key) {
        return $this->getDocBaseUrl() . '/wiki/' . $key;
    }

    /**
     * Returns the primary color
     */
    public function getColorPrimary() {
        return '#00695C'; // Deep Teal
    }

    /**
     * Returns the background color
     */
    public function getColorBackground() {
        return '#FEFEFE'; // Near White
    }

    /**
     * Returns the text color
     */
    public function getTextColorPrimary() {
        return '#1C1B1F'; // Material On-Surface
    }

    /**
     * Returns the theme version
     */
    public function getVersion() {
        return '2.0.0';
    }

    /**
     * Returns the theme edition
     */
    public function getEdition() {
        return 'SEPEHR Material Design RTL Edition';
    }

    /**
     * Returns the mail header color
     */
    public function getMailHeaderColor() {
        return $this->getColorPrimary();
    }

    /**
     * Returns if custom user theming is supported
     */
    public function shouldReplaceIcons() {
        return true;
    }

    /**
     * Returns custom CSS for emails
     */
    public function getMailBodyStyles() {
        return "
            body { 
                font-family: 'Vazirmatn', 'Roboto', sans-serif; 
                direction: rtl; 
                text-align: right; 
            }
            .header { 
                background-color: {$this->getColorPrimary()}; 
                color: white; 
            }
        ";
    }

    /**
     * Returns the login background image
     */
    public function getLogo($useSvg = true) {
        if ($useSvg) {
            return $this->getBaseUrl() . '/core/img/logo.svg';
        }
        return $this->getBaseUrl() . '/core/img/logo.png';
    }

    /**
     * Returns custom JavaScript (camelCase expected by Nextcloud theming API)
     */
    public function getCustomJS() {
        return $this->getBaseUrl() . '/core/js/sepehr.js';
    }

    /**
     * Returns custom CSS
     */
    public function getCustomCSS() {
        return $this->getBaseUrl() . '/core/css/server.css';
    }

    /**
     * Returns if the theme supports dark mode
     */
    public function supportsDarkTheme() {
        return true;
    }

    /**
     * Returns RTL support
     */
    public function supportsRTL() {
        return true;
    }

    /**
     * Get default language
     */
    public function getDefaultLanguage() {
        return 'fa'; // Persian/Farsi
    }

    /**
     * Get default locale
     */
    public function getDefaultLocale() {
        return 'fa_IR'; // Persian Iran
    }
}