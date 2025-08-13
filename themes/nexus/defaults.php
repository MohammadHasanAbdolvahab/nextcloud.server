<?php
/**
 * SPDX-FileCopyrightText: 2025 Nexus Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

class OC_Theme {

    public function getTitle() {
        return 'نکسوس کلود';
    }

    public function getName() {
        return 'نکسوس کلود - پلتفرم ابری مدرن';
    }

    public function getBaseUrl() {
        return 'https://nexuscloud.ir';
    }

    public function getSlogan() {
        return 'فضای ابری مدرن و امن برای همه';
    }

    public function getShortFooter() {
        return 'نکسوس کلود - طراحی شده با ❤️ برای کاربران ایرانی';
    }

    public function getLongFooter() {
        return 'نکسوس کلود - پلتفرم ابری مدرن با پشتیبانی کامل از زبان فارسی و طراحی RTL';
    }

    public function buildDocLinkToKey($key) {
        return 'https://docs.nexuscloud.ir/' . $key;
    }

    public function getColorPrimary() {
        return '#1976D2';
    }

    public function getColorBackground() {
        return '#FAFAFA';
    }

    public function getColorElement() {
        return '#FFFFFF';
    }

    public function getColorElementBright() {
        return '#F5F5F5';
    }

    public function getColorElementDark() {
        return '#E0E0E0';
    }

    public function getColorText() {
        return '#424242';
    }

    public function getTextColorPrimary() {
        return '#FFFFFF';
    }

    public function getMailHeaderColor() {
        return '#1976D2';
    }

    public function getLogo() {
        return \OC::$WEBROOT . '/themes/nexus/core/img/logo.svg';
    }

    public function getBackground() {
        return \OC::$WEBROOT . '/themes/nexus/core/img/background.jpg';
    }

    public function getEntity() {
        return 'نکسوس کلود';
    }

    public function getDocBaseUrl() {
        return 'https://docs.nexuscloud.ir';
    }

    public function getSyncClientUrl() {
        return 'https://download.nexuscloud.ir';
    }

    public function getAndroidClientUrl() {
        return 'https://play.google.com/store/apps/details?id=ir.nexuscloud.android';
    }

    public function getiOSClientUrl() {
        return 'https://apps.apple.com/app/nexuscloud/id123456789';
    }

    public function getLogoClaim() {
        return 'نکسوس کلود - فضای ابری مدرن';
    }

    public function getPrivacyUrl() {
        return 'https://nexuscloud.ir/privacy';
    }

    public function getImprintUrl() {
        return 'https://nexuscloud.ir/imprint';
    }

    public function getInvertedLogo() {
        return false;
    }

    public function shouldReplaceIcons() {
        return true;
    }
}
