// SPDX-FileCopyrightText: 2025 SEPEHR Theme
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * SEPEHR Material Design Theme JavaScript
 * Interactive enhancements, Material Design behaviors, and dark mode functionality
 */

(function () {
	"use strict";

	// Debug: Log immediately when script loads
	console.log("🚀 SEPEHR Theme Script Loaded!");

	// Dark mode state management
	let isDarkMode = localStorage.getItem("sepehr-dark-mode") === "true";

	// Apply dark mode class immediately to prevent flash
	function applyDarkMode(dark) {
		if (dark) {
			document.documentElement.classList.add("sepehr-dark-mode");
			document.body.classList.add("sepehr-dark-mode");

			// Special handling for login page
			if (document.body.id === "body-login") {
				document.body.classList.add("sepehr-dark-mode");
			}
		} else {
			document.documentElement.classList.remove("sepehr-dark-mode");
			document.body.classList.remove("sepehr-dark-mode");
		}
	}

	// Apply initial dark mode state immediately
	applyDarkMode(isDarkMode);

	// Also apply when DOM is loading (for login page)
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", function () {
			applyDarkMode(isDarkMode);
		});
	}

	// Theme initialization
	document.addEventListener("DOMContentLoaded", function () {
		console.log("🎯 SEPEHR Theme DOMContentLoaded fired");
		initializeTheme();
		createThemeToggle();
		createFooter();
		setupFileSelection();
		setupMaterialRipple();
		setupTableEnhancements();
		setupFormEnhancements();
		setupNotifications();
		fixTableHeaderOverlap();
		initializeSettingsNavigation(); // Add RTL settings navigation
	});

	/**
	 * Create dark/light mode toggle button
	 */
	function createThemeToggle() {
		console.log("SEPEHR Theme: Creating theme toggle");

		// Don't add toggle on login page - dark mode will still work via localStorage
		if (
			document.body.id === "body-login" ||
			document.body.id === "body-public"
		) {
			console.log(
				"SEPEHR Theme: Skipping toggle creation on login/public page"
			);
			return null;
		}

		const header = document.querySelector(".header-end");
		if (!header) {
			console.log("SEPEHR Theme: Header not found for toggle");
			return null;
		}

		// Check if toggle already exists
		if (document.getElementById("sepehr-theme-toggle")) {
			console.log("SEPEHR Theme: Toggle already exists");
			return document.getElementById("sepehr-theme-toggle");
		}

		// If no specific container found, create one that doesn't interfere
		const targetContainer = document.createElement("div");
		targetContainer.className += 'header-menu';
		header.prepend(targetContainer);

		const toggle = document.createElement("button");
		toggle.id = "sepehr-theme-toggle";
		toggle.setAttribute(
			"aria-label",
			isDarkMode ? "تغییر به حالت روز" : "تغییر به حالت شب"
		);
		toggle.setAttribute(
			"title",
			isDarkMode ? "تغییر به حالت روز" : "تغییر به حالت شب"
		);

		// SVG icons for sun and moon
		toggle.innerHTML = `
			<svg class="icon sun-icon" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z" />
			</svg>
			<svg class="icon moon-icon" viewBox="0 0 24 24" fill="currentColor">
				<path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.4 6.35,17.41C9.37,20.43 14,20.54 17.33,17.97Z" />
			</svg>
		`;

		// Add click handler
		toggle.addEventListener("click", function () {
			isDarkMode = !isDarkMode;
			localStorage.setItem("sepehr-dark-mode", isDarkMode.toString());

			applyDarkMode(isDarkMode);

			// Update aria-label and title
			toggle.setAttribute(
				"aria-label",
				isDarkMode ? "تغییر به حالت روز" : "تغییر به حالت شب"
			);
			toggle.setAttribute(
				"title",
				isDarkMode ? "تغییر به حالت روز" : "تغییر به حالت شب"
			);

			console.log(
				"SEPEHR Theme: Theme switched to",
				isDarkMode ? "dark" : "light"
			);
		});

		// Insert the toggle button
		targetContainer.appendChild(toggle);

		console.log("SEPEHR Theme: Theme toggle created and added");
		return toggle;
	}

	/**
	 * Initialize the theme
	 */
	function initializeTheme() {
		// Set RTL direction
		document.documentElement.setAttribute("dir", "rtl");
		document.body.classList.add("sepehr-theme");

		// Apply Material Design classes
		applyMaterialDesignClasses();

		console.log("SEPEHR Material Design Theme initialized");
	}

	/**
	 * Create the SEPEHR footer
	 */
	function createFooter() {
		// Don't add footer on login page
		if (
			document.body.id === "body-login" ||
			document.body.id === "body-public"
		) {
			return;
		}

		// Only show footer if #app-content-vue exists
		const appContentVue = document.getElementById("app-content-vue");
		if (!appContentVue) {
			console.log(
				"SEPEHR: No #app-content-vue found, footer not created"
			);
			return;
		}

		// Check if footer already exists
		if (document.getElementById("sepehr-footer")) {
			return;
		}

		// Add class to body for CSS fallback
		document.body.classList.add("has-app-content-vue");

		// Wait for layout to be ready
		setTimeout(function () {
			// Create footer element
			const footer = document.createElement("footer");
			footer.id = "sepehr-footer";
			footer.innerHTML = "<span>توان گرفته از مرکز بهشتی نژاد</span>";

			// Check if mobile view
			const isMobile = window.innerWidth <= 768;

			if (isMobile) {
				// Mobile: Add to body for fixed positioning
				document.body.appendChild(footer);
				console.log(
					"SEPEHR footer created for mobile (fixed positioning) - using #app-content-vue"
				);
			} else {
				// Desktop: Add to app-content-vue for relative positioning
				appContentVue.appendChild(footer);
				console.log(
					"SEPEHR footer created for desktop (relative positioning) - using #app-content-vue"
				);
			}
		}, 100);
	}

	/**
	 * Fix table header overlap issues
	 */
	function fixTableHeaderOverlap() {
		const tables = document.querySelectorAll("#filestable, .files-table");
		tables.forEach((table) => {
			// Ensure proper spacing
			if (table.id === "filestable") {
				table.style.marginTop = "2rem";

				// Fix header positioning
				const thead = table.querySelector("thead");
				if (thead) {
					thead.style.position = "sticky";
					thead.style.top = "0";
					thead.style.zIndex = "100";
					thead.style.background = "var(--md-surface-variant)";
				}

				// Ensure first row is visible
				const firstRow = table.querySelector("tbody tr:first-child");
				if (firstRow) {
					firstRow.style.borderTop = "none";
				}
			}
		});

		// Fix app content spacing
		const appContent = document.querySelector(
			".app-content-list, .app-content-wrapper"
		);
		if (appContent) {
			appContent.style.marginTop = "2rem";
		}
	}

	/**
	 * Apply Material Design classes to existing elements
	 */
	function applyMaterialDesignClasses() {
		// Convert checkboxes to Material Design
		const checkboxes = document.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach((checkbox) => {
			if (!checkbox.closest(".checkbox-material")) {
				wrapCheckboxWithMaterial(checkbox);
			}
		});

		// Enhance buttons
		const buttons = document.querySelectorAll(
			'button, .button, input[type="submit"]'
		);
		buttons.forEach((button) => {
			if (!button.classList.contains("material-enhanced")) {
				button.classList.add("material-enhanced");
			}
		});
	}

	/**
	 * Wrap checkbox with Material Design structure
	 */
	function wrapCheckboxWithMaterial(checkbox) {
		const wrapper = document.createElement("div");
		wrapper.className = "checkbox-material";

		const checkmark = document.createElement("span");
		checkmark.className = "checkmark";

		checkbox.parentNode.insertBefore(wrapper, checkbox);
		wrapper.appendChild(checkbox);
		wrapper.appendChild(checkmark);
	}

	/**
	 * Setup mobile navigation - Removed sidebar code
	 */
	function setupMobileNavigation() {
		// Mobile navigation is now handled by Nextcloud's header menu
		// No custom sidebar needed
		console.log("Using Nextcloud's built-in mobile navigation");
	}

	/**
	 * Setup file selection functionality
	 */
	function setupFileSelection() {
		const fileTable = document.getElementById("filestable");
		if (!fileTable) return;

		let selectedFiles = new Set();
		const actionBar = document.getElementById("selectedActionsList");

		// Create action bar if it doesn't exist
		if (!actionBar) {
			createActionBar();
		}

		// Handle row selection
		fileTable.addEventListener("click", function (e) {
			const row = e.target.closest("tr");
			if (!row || row.classList.contains("header")) return;

			const checkbox = row.querySelector('input[type="checkbox"]');
			if (!checkbox) return;

			// Toggle selection
			if (
				e.target === checkbox ||
				e.target.closest(".checkbox-material")
			) {
				toggleFileSelection(row, checkbox);
			} else {
				// Click on row selects it
				checkbox.checked = !checkbox.checked;
				toggleFileSelection(row, checkbox);
			}

			updateSelectionUI();
		});

		// Handle select all
		const selectAllCheckbox = fileTable.querySelector(
			'thead input[type="checkbox"]'
		);
		if (selectAllCheckbox) {
			selectAllCheckbox.addEventListener("change", function () {
				const checkboxes = fileTable.querySelectorAll(
					'tbody input[type="checkbox"]'
				);
				checkboxes.forEach((checkbox) => {
					checkbox.checked = selectAllCheckbox.checked;
					const row = checkbox.closest("tr");
					toggleFileSelection(row, checkbox, false);
				});
				updateSelectionUI();
			});
		}

		function toggleFileSelection(row, checkbox, updateSelectAll = true) {
			const fileId = row.dataset.file || row.dataset.id;

			if (checkbox.checked) {
				row.classList.add("selected");
				selectedFiles.add(fileId);
			} else {
				row.classList.remove("selected");
				selectedFiles.delete(fileId);
			}

			// Update select all checkbox
			if (updateSelectAll && selectAllCheckbox) {
				const totalCheckboxes = fileTable.querySelectorAll(
					'tbody input[type="checkbox"]'
				).length;
				const checkedCheckboxes = fileTable.querySelectorAll(
					'tbody input[type="checkbox"]:checked'
				).length;
				selectAllCheckbox.checked =
					checkedCheckboxes === totalCheckboxes;
				selectAllCheckbox.indeterminate =
					checkedCheckboxes > 0 &&
					checkedCheckboxes < totalCheckboxes;
			}
		}

		function updateSelectionUI() {
			const actionBar = document.getElementById("selectedActionsList");
			if (!actionBar) return;

			if (selectedFiles.size > 0) {
				actionBar.classList.add("show");
				const selectionInfo =
					actionBar.querySelector(".selection-info");
				if (selectionInfo) {
					selectionInfo.textContent = `${selectedFiles.size} فایل انتخاب شده`;
				}
			} else {
				actionBar.classList.remove("show");
			}
		}

		function createActionBar() {
			const actionBar = document.createElement("div");
			actionBar.id = "selectedActionsList";
			actionBar.innerHTML = `
                <div class="selection-info">0 فایل انتخاب شده</div>
                <div class="actions">
                    <button class="button secondary" onclick="downloadSelected()">دانلود</button>
                    <button class="button outlined" onclick="moveSelected()">انتقال</button>
                    <button class="button text" onclick="deleteSelected()">حذف</button>
                </div>
            `;
			document.body.appendChild(actionBar);
		}
	}

	/**
	 * Setup Material Design ripple effect
	 */
	function setupMaterialRipple() {
		document.addEventListener("click", function (e) {
			const button = e.target.closest(".button, button, .btn");
			if (!button) return;

			// Create ripple element
			const ripple = document.createElement("span");
			ripple.className = "ripple";

			// Calculate ripple size and position
			const rect = button.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			// Apply styles
			ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;

			// Add ripple to button
			button.style.position = "relative";
			button.style.overflow = "hidden";
			button.appendChild(ripple);

			// Remove ripple after animation
			setTimeout(() => {
				if (ripple.parentNode) {
					ripple.parentNode.removeChild(ripple);
				}
			}, 600);
		});

		// Add ripple animation CSS
		if (!document.getElementById("ripple-styles")) {
			const style = document.createElement("style");
			style.id = "ripple-styles";
			style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
			document.head.appendChild(style);
		}
	}

	/**
	 * Setup table enhancements
	 */
	function setupTableEnhancements() {
		const tables = document.querySelectorAll("table");
		tables.forEach((table) => {
			// Add hover effects
			const rows = table.querySelectorAll("tbody tr");
			rows.forEach((row) => {
				row.addEventListener("mouseenter", function () {
					this.style.transform = "translateY(-1px)";
					this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
				});

				row.addEventListener("mouseleave", function () {
					if (!this.classList.contains("selected")) {
						this.style.transform = "";
						this.style.boxShadow = "";
					}
				});
			});

			// Enhance sorting
			const headers = table.querySelectorAll("th[data-sort]");
			headers.forEach((header) => {
				header.style.cursor = "pointer";
				header.addEventListener("click", function () {
					// Add sorting visual feedback
					headers.forEach((h) =>
						h.classList.remove("sort-asc", "sort-desc")
					);

					const currentSort = this.dataset.currentSort || "none";
					if (currentSort === "asc") {
						this.classList.add("sort-desc");
						this.dataset.currentSort = "desc";
					} else {
						this.classList.add("sort-asc");
						this.dataset.currentSort = "asc";
					}
				});
			});
		});
	}

	/**
	 * Setup form enhancements
	 */
	function setupFormEnhancements() {
		// Floating labels for inputs
		const inputs = document.querySelectorAll("input, textarea");
		inputs.forEach((input) => {
			if (input.type === "checkbox" || input.type === "radio") return;

			// Add focus/blur classes
			input.addEventListener("focus", function () {
				this.parentElement?.classList.add("focused");
			});

			input.addEventListener("blur", function () {
				this.parentElement?.classList.remove("focused");
				if (this.value) {
					this.parentElement?.classList.add("filled");
				} else {
					this.parentElement?.classList.remove("filled");
				}
			});

			// Check initial value
			if (input.value) {
				input.parentElement?.classList.add("filled");
			}
		});

		// Form validation feedback
		const forms = document.querySelectorAll("form");
		forms.forEach((form) => {
			form.addEventListener("submit", function (e) {
				const inputs = this.querySelectorAll(
					"input[required], textarea[required]"
				);
				inputs.forEach((input) => {
					if (!input.value.trim()) {
						input.classList.add("error");
						e.preventDefault();
					} else {
						input.classList.remove("error");
					}
				});
			});
		});
	}

	/**
	 * Setup notifications
	 */
	function setupNotifications() {
		// Auto-dismiss notifications
		const notifications = document.querySelectorAll(".notification");
		notifications.forEach((notification) => {
			setTimeout(() => {
				notification.style.opacity = "0";
				notification.style.transform = "translateX(100%)";
				setTimeout(() => {
					notification.remove();
				}, 300);
			}, 5000);
		});
	}

	/**
	 * Utility function to show notifications
	 */
	window.showNotification = function (message, type = "info") {
		const notification = document.createElement("div");
		notification.className = `notification ${type}`;
		notification.innerHTML = `
            <div>${message}</div>
            <button onclick="this.parentElement.remove()" style="margin-right: 10px;">&times;</button>
        `;

		document.body.appendChild(notification);

		// Animate in
		setTimeout(() => {
			notification.style.opacity = "1";
			notification.style.transform = "translateX(0)";
		}, 100);

		// Auto dismiss
		setTimeout(() => {
			if (notification.parentElement) {
				notification.style.opacity = "0";
				notification.style.transform = "translateX(100%)";
				setTimeout(() => notification.remove(), 300);
			}
		}, 5000);
	};

	/**
	 * File action functions (called from action bar)
	 */
	window.downloadSelected = function () {
		const selected = document.querySelectorAll(
			"#filestable tbody tr.selected"
		);
		if (selected.length === 0) return;

		showNotification(`شروع دانلود ${selected.length} فایل`, "success");
		// Add actual download logic here
	};

	window.moveSelected = function () {
		const selected = document.querySelectorAll(
			"#filestable tbody tr.selected"
		);
		if (selected.length === 0) return;

		showNotification(`انتقال ${selected.length} فایل`, "info");
		// Add actual move logic here
	};

	window.deleteSelected = function () {
		const selected = document.querySelectorAll(
			"#filestable tbody tr.selected"
		);
		if (selected.length === 0) return;

		if (confirm(`آیا از حذف ${selected.length} فایل اطمینان دارید؟`)) {
			showNotification(`حذف ${selected.length} فایل`, "warning");
			// Add actual delete logic here
		}
	};

	// Theme API for external use
	window.SepehrTheme = {
		showNotification: window.showNotification,
		version: "1.0.0",
		initialized: true,
	};

	/**
	 * Initialize theme toggle on dynamic content loads
	 */
	function checkForThemeToggle() {
		if (!document.getElementById("sepehr-theme-toggle")) {
			console.log("SEPEHR Theme: Retry creating theme toggle");
			createThemeToggle();
		}
	}

	// Retry creating toggle after delays for dynamic content
	setTimeout(checkForThemeToggle, 1000);
	setTimeout(checkForThemeToggle, 3000);

	// Also check when window hash changes (navigation)
	window.addEventListener("hashchange", function () {
		setTimeout(checkForThemeToggle, 500);
	});

	/**
	 * RTL Settings Navigation Handler
	 * Fixes navigation toggle and close functionality for body-settings
	 */
	function initializeSettingsNavigation() {
		// Only run on settings pages
		if (!document.body.id || document.body.id !== 'body-settings') {
			return;
		}
		
		console.log("SEPEHR Theme: Initializing RTL settings navigation");
		
		// Override existing navigation toggle behavior
		function handleNavigationToggle() {
			const body = document.body;
			const navigation = document.querySelector('#app-navigation');
			
			if (!navigation) return;
			
			// Toggle the snapjs-left class
			if (body.classList.contains('snapjs-left')) {
				// Close navigation
				body.classList.remove('snapjs-left');
				navigation.classList.remove('mobile-open');
			} else {
				// Open navigation
				body.classList.add('snapjs-left');
				navigation.classList.add('mobile-open');
			}
		}
		
		// Handle navigation toggle button clicks
		document.addEventListener('click', function(e) {
			const toggleButton = e.target.closest('#app-navigation-toggle');
			if (toggleButton) {
				e.preventDefault();
				e.stopPropagation();
				handleNavigationToggle();
			}
		});
		
		// Handle backdrop clicks to close navigation
		document.addEventListener('click', function(e) {
			const body = document.body;
			const navigation = document.querySelector('#app-navigation');
			const clickedInsideNav = e.target.closest('#app-navigation');
			const clickedToggle = e.target.closest('#app-navigation-toggle');
			
			// Close if clicked outside navigation when nav is open
			// Only check if navigation is open and click is not inside nav or on toggle
			if (body.classList.contains('snapjs-left') && !clickedInsideNav && !clickedToggle) {
				// Check if click is on content area (not on the navigation side)
				const clickX = e.clientX;
				const windowWidth = window.innerWidth;
				
				// If clicking on left side of screen (away from right-side navigation)
				if (clickX < windowWidth - 300) {
					body.classList.remove('snapjs-left');
					if (navigation) {
						navigation.classList.remove('mobile-open');
					}
				}
			}
		});
		
		// Handle escape key to close navigation
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape') {
				const body = document.body;
				const navigation = document.querySelector('#app-navigation');
				
				if (body.classList.contains('snapjs-left')) {
					body.classList.remove('snapjs-left');
					if (navigation) {
						navigation.classList.remove('mobile-open');
					}
				}
			}
		});
		
		// Handle window resize - close navigation on larger screens
		window.addEventListener('resize', function() {
			if (window.innerWidth >= 1024) {
				const body = document.body;
				const navigation = document.querySelector('#app-navigation');
				
				body.classList.remove('snapjs-left');
				if (navigation) {
					navigation.classList.remove('mobile-open');
				}
			}
		});
	}

	console.log(
		"SEPEHR Material Design Theme script loaded with dark mode support"
	);
})();
