<?php
/**
 * SPDX-FileCopyrightText: 2025 Nexus Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
?>
<!DOCTYPE html>
<html dir="rtl" lang="fa">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php p($theme->getTitle()); ?> - ورود</title>
    <link rel="stylesheet" href="<?php print_unescaped(OC::$WEBROOT); ?>/themes/nexus/core/css/server.css">
</head>
<body>
    <div class="login-wrapper">
        <img src="<?php print_unescaped(OC::$WEBROOT); ?>/themes/nexus/core/img/logo.svg" alt="<?php p($theme->getTitle()); ?>" class="login-logo">
        <h1 class="login-title"><?php p($theme->getTitle()); ?></h1>
        <p class="login-subtitle"><?php p($theme->getSlogan()); ?></p>
        <form method="post" name="login" class="login-form">
            <input type="hidden" name="timezone-offset" id="timezone-offset"/>
            <input type="hidden" name="requesttoken" value="<?php p($_['requesttoken']) ?>">
            <div class="form-group">
                <label for="user" class="form-label">نام کاربری</label>
                <input type="text" name="user" id="user" class="form-input" placeholder="نام کاربری خود را وارد کنید" value="<?php p($_['username']); ?>" <?php p($_['user_autofocus'] ? 'autofocus' : ''); ?> autocomplete="on" required dir="rtl">
            </div>
            <div class="form-group">
                <label for="password" class="form-label">رمز عبور</label>
                <input type="password" name="password" id="password" class="form-input" placeholder="رمز عبور خود را وارد کنید" <?php p($_['user_autofocus'] ? '' : 'autofocus'); ?> autocomplete="current-password" required dir="rtl">
            </div>
            <div class="form-options">
                <label class="remember-me">
                    <input type="checkbox" name="remember_login" value="1" id="remember_login">
                    <span>مرا به خاطر بسپار</span>
                </label>
                <?php if ($_['resetPasswordLink']): ?>
                <a href="<?php print_unescaped($_['resetPasswordLink']); ?>" class="forgot-link">رمز عبور را فراموش کرده‌اید؟</a>
                <?php endif; ?>
            </div>
            <button type="submit" class="login-button">ورود</button>
        </form>
        <div class="login-footer">
            <p><?php print_unescaped($theme->getLongFooter()); ?></p>
        </div>
    </div>
    <script>
        document.getElementById('timezone-offset').value = new Date().getTimezoneOffset();
    </script>
</body>
</html>
