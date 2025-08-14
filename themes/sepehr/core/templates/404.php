<?php

/**
 * SPDX-FileCopyrightText: 2025 SEPEHR Theme
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
?>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: var(--sepehr-font-family);
        direction: rtl;
        background: linear-gradient(135deg, #00695c 0%, #4db6ac 50%, #26a69a 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin: 0;
        padding: 0;
    }

    .error-container {
        text-align: center;
        /* max-width: 600px; */
        padding: 2rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .error-code {
        font-size: 8rem;
        font-weight: 800;
        line-height: 1;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .error-title {
        font-size: 2.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        font-family: var(--sepehr-font-headline);
    }

    .error-message {
        font-size: 1.25rem;
        line-height: 1.6;
        margin-bottom: 2rem;
        opacity: 0.9;
    }

    .error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        color: white;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    }

    .btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .btn-primary {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
    }

    .btn-primary:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: white;
    }

    .icon {
        width: 20px;
        height: 20px;
    }

    .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }

    .floating-element {
        position: absolute;
        opacity: 0.1;
        animation: float 20s infinite ease-in-out;
    }

    .floating-element:nth-child(1) {
        top: 10%;
        left: 10%;
        animation-delay: 0s;
    }

    .floating-element:nth-child(2) {
        top: 20%;
        right: 10%;
        animation-delay: 5s;
    }

    .floating-element:nth-child(3) {
        bottom: 20%;
        left: 20%;
        animation-delay: 10s;
    }

    .floating-element:nth-child(4) {
        bottom: 10%;
        right: 20%;
        animation-delay: 15s;
    }

    @keyframes float {

        0%,
        100% {
            transform: translateY(0px) rotate(0deg);
        }

        25% {
            transform: translateY(-20px) rotate(5deg);
        }

        50% {
            transform: translateY(0px) rotate(0deg);
        }

        75% {
            transform: translateY(-10px) rotate(-5deg);
        }
    }

    @media (max-width: 768px) {
        .error-code {
            font-size: 5rem;
        }

        .error-title {
            font-size: 2rem;
        }

        .error-message {
            font-size: 1.1rem;
        }

        .error-actions {
            flex-direction: column;
            align-items: center;
        }

        .btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
        }
    }
</style>
<div class="floating-elements">
    <div class="floating-element">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
        </svg>
    </div>
    <div class="floating-element">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
    </div>
    <div class="floating-element">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
    <div class="floating-element">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    </div>
</div>

<div class="error-container">
    <div class="error-code">404</div>
    <h1 class="error-title">صفحه یافت نشد</h1>
    <p class="error-message">
        متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است منتقل شده باشد.
        <br>
        لطفاً آدرس را بررسی کنید یا به صفحه اصلی بازگردید.
    </p>

    <div class="error-actions">
        <a href="<?php print_unescaped(OC::$WEBROOT); ?>/" class="btn btn-primary">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            بازگشت به خانه
        </a>

        <a href="javascript:history.back()" class="btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
            </svg>
            صفحه قبل
        </a>
    </div>
</div>