// SPDX-FileCopyrightText: 2025 SEPEHR Theme
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * SEPEHR Material Design Theme JavaScript
 * Interactive enhancements and Material Design behaviors
 */

(function () {
	"use strict";

	// Debug: Log immediately when script loads
	console.log("🚀 SEPEHR Theme Script Loaded!");

	// Theme initialization
	document.addEventListener("DOMContentLoaded", function () {
		console.log("🎯 SEPEHR Theme DOMContentLoaded fired");
		initializeTheme();
		createFooter();
		setupFileSelection();
		setupMaterialRipple();
		setupTableEnhancements();
		setupFormEnhancements();
		setupNotifications();
		fixTableHeaderOverlap();
	});

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
			console.log("SEPEHR: No #app-content-vue found, footer not created");
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
				console.log("SEPEHR footer created for mobile (fixed positioning) - using #app-content-vue");
			} else {
				// Desktop: Add to app-content-vue for relative positioning
				appContentVue.appendChild(footer);
				console.log("SEPEHR footer created for desktop (relative positioning) - using #app-content-vue");
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
})();
