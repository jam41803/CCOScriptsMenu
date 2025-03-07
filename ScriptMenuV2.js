// ==UserScript==
// @name         Kenny's CCO Menu
// @namespace    jam41803
// @version      1.0
// @description  CCO Script Menu
// @author       jam41803
// @match        https://case-clicker.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @require      https://ajax.googleapis.com/ajax/libs/jqueryui/1.14.1/jquery-ui.min.js
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Create the settings menu container
    const menu = document.createElement("div");
    menu.innerHTML = `
        <div id="settings-menu" class="settings-menu">
            <div id="tabs" class="tabs">
                <!-- Tabs will be dynamically added here -->
            </div>
            <div id="settings-content">
                <!-- Tab content will be dynamically added here -->
            </div>
            <div class="setting-item">
                <div id="close-label">Toggle with ALT+G</div>
                <button id="close-menu">Close</button>
            </div>
        </div>
    `;
    // Apply basic styles for the menu
    Object.assign(menu.style, {
        background: "#2c3e50",
        color: "white",
        padding: "15px",
        borderRadius: "10px",
        position: "absolute",
        top: "50px",
        left: "50px",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
        overflow: "auto",  // Allow scrolling if content overflows
        height: "50%",
        width: "30%",
        maxHeight: "80vh",
        overflowY: "auto"
    });

    // Style for tabs (pill style)
    const tabs = menu.querySelector("#tabs");
    Object.assign(tabs.style, {
        display: "flex",
        marginBottom: "10px",
        justifyContent: "center",
        backgroundColor: "#34495e",  // Inactive tab background color
        borderRadius: "5px",  // Rounded corners for the tab holder
        padding: "5px",  // Padding to give some space between tabs
        zIndex: "1000"

    });

    // Style for tab button (pill-like appearance)
    const tabStyle = {
        padding: "10px 20px",
        backgroundColor: "#34495e",  // Inactive tab background color
        border: "2px solid #34495e",
        color: "white",
        borderRadius: "5px",  // Rounded corners for pill shape
        cursor: "pointer",
        textAlign: "center",
        flex: "1",
        margin: "0px",
        fontSize: "14px",
        transition: "background-color 0.3s ease, color 0.3s ease"
    };

    // Style for active tab
    const activeTabStyle = {
        backgroundColor: "#1abc9c",  // Active tab color (greenish)
        borderColor: "#1abc9c",      // Active border color
        color: "#fff"                // Active text color
    };

    // Add hover effect for tabs
    const tabHoverStyle = {
        backgroundColor: "#2c3e50", // Hover color
        color: "#ecf0f1"             // Hover text color
    };

    // Style for tab content area
    const settingsContent = menu.querySelector("#settings-content");
    settingsContent.style.position = "relative"; // Allow positioning of tab content

    // Add hover effect for close button
    const closeButton = menu.querySelector("#close-menu");
    closeButton.style.backgroundColor = "#e74c3c";
    closeButton.style.border = "none";
    closeButton.style.color = "white";
    closeButton.style.padding = "8px 12px";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "5px"; // Rounded corners for close button
    closeButton.style.position = "absolute"; // Position the button
    closeButton.style.bottom = "15px"; // 15px from the bottom
    closeButton.style.right = "15px"; // 15px from the right

    const closeLabel = menu.querySelector("#close-label");
    closeLabel.style.left = "15px";
    closeLabel.style.bottom = "15px";
    closeLabel.style.position = "absolute";

    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.cursor = 'grabbing';  // Change cursor when dragging
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const left = e.clientX - offsetX;
                const top = e.clientY - offsetY;
                element.style.left = `${left}px`;
                element.style.top = `${top}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            element.style.cursor = 'grab';  // Revert cursor
        });
    }

    // Make the menu draggable by the tabs section
    makeDraggable(menu);
    makeDraggable(tabs)

    function saveMenuPosition() {
    GM_setValue("menuLeft", menu.style.left);
    GM_setValue("menuTop", menu.style.top);
    }

    function restoreMenuPosition() {
        const left = GM_getValue("menuLeft", "50px");
        const top = GM_getValue("menuTop", "50px");
        menu.style.left = left;
        menu.style.top = top;
    }

restoreMenuPosition(); // Call this at the start

document.addEventListener('mouseup', saveMenuPosition);

    // Append the menu to the body
    document.body.appendChild(menu);

    // Function to add a new tab dynamically
    function addTab(tabId, tabTitle) {
        // Create the tab button
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.setAttribute("data-tab", tabId);
        tabButton.textContent = tabTitle;

        // Apply pill style to tab
        Object.assign(tabButton.style, tabStyle);

        // Add hover effect
        tabButton.addEventListener("mouseover", () => {
            Object.assign(tabButton.style, tabHoverStyle);
        });

        tabButton.addEventListener("mouseout", () => {
            if (!tabButton.classList.contains('active')) {
                Object.assign(tabButton.style, tabStyle);
            }
        });

        // Add tab click listener
        tabButton.addEventListener("click", () => {
            // Hide all tab content
            const tabContents = menu.querySelectorAll(".tab-content");
            tabContents.forEach(content => {
                content.style.display = "none";
                content.style.opacity = "0"; // Set opacity to 0 for smooth transition
                content.style.transform = "translateX(-100%)"; // Slide out
            });

            // Show the selected tab content with transition
            const activeTab = menu.querySelector(`#${tabId}`);
            activeTab.style.display = "block";
            activeTab.style.opacity = "1"; // Set opacity to 1 for visible content
            activeTab.style.transform = "translateX(0)"; // Slide in

            // Add transition for sliding effect
            activeTab.style.transition = "transform 0.5s ease, opacity 0.5s ease";

            // Remove the 'active' class from all tabs and add it to the selected one
            const allTabButtons = tabs.querySelectorAll(".tab-button");
            allTabButtons.forEach(button => {
                button.classList.remove("active");
                // Reset background color for all tabs
                Object.assign(button.style, tabStyle);
            });
            tabButton.classList.add("active");
            // Apply active tab styles
            Object.assign(tabButton.style, activeTabStyle);
        });

        // Add the tab button to the tabs container
        tabs.appendChild(tabButton);

        // Create the content container for this tab
        const tabContent = document.createElement("div");
        tabContent.id = tabId;
        tabContent.classList.add("tab-content");
        tabContent.style.display = "none"; // Hide by default
        tabContent.style.position = "absolute"; // Position the content
        tabContent.style.top = "0";
        tabContent.style.left = "0";
        tabContent.style.width = "100%";
        tabContent.style.height = "100%";

        // Add the content container to the settings content area
        settingsContent.appendChild(tabContent);

        // Set the first tab as active
        if (tabs.querySelectorAll(".tab-button").length === 1) {
            tabButton.classList.add("active");
            // Apply active tab styles
            Object.assign(tabButton.style, activeTabStyle);
            tabContent.style.display = "block"; // Show first tab content
            tabContent.style.opacity = "1"; // Make first tab content visible
        }
    }

    // Add the first tab and content as an example
    addTab("general", "General");
    addTab("advanced", "Advanced");

    // Function to add a setting (with save functionality)
    function addSetting(type, label, id, placeholder = "", tab = "general") {
        // Ensure the tab content exists
        const tabContent = menu.querySelector(`#${tab}`);
        if (!tabContent) {
            console.error(`Tab content for "${tab}" not found.`);
            return;
        }

        const settingItem = document.createElement("div");
        settingItem.classList.add("setting-item");

        // Create label
        const settingLabel = document.createElement("label");
        settingLabel.setAttribute("for", id);
        settingLabel.textContent = label;

        // Create the setting input based on the type
        let settingInput;
        if (type === "checkbox") {
            settingInput = document.createElement("input");
            settingInput.type = "checkbox";
            settingInput.id = id;
            // Load the saved state of the checkbox
            settingInput.checked = GM_getValue(id, false);
            settingInput.style.marginRight = "10px"; // Space between checkbox and label

            settingInput.addEventListener("change", function() {
                GM_setValue(id, settingInput.checked); // Save the state of the checkbox
            });
        } else if (type === "text") {
            settingInput = document.createElement("input");
            settingInput.type = "text";
            settingInput.placeholder = placeholder;
            settingInput.id = id;
            // Load the saved value for the text input
            settingInput.value = GM_getValue(id, "");
            settingInput.style.marginTop = "5px"; // Space between text input and label
            settingInput.style.marginLeft = "5px"

            settingInput.addEventListener("input", function() {
                GM_setValue(id, settingInput.value); // Save the value of the text input
            });
        } else if (type === "switch") {
            settingInput = document.createElement("input");
            settingInput.type = "checkbox";
            settingInput.classList.add("switch");
            settingInput.id = id;
            // Load the saved state of the switch
            settingInput.checked = GM_getValue(id, false);
            settingItem.style.display = "flex";
            settingItem.style.alignItems = "center";

            // Add switch style (no span now)
            settingItem.appendChild(settingLabel);
            settingItem.appendChild(settingInput);

            // Style the switch input to look like a toggle switch
            settingInput.style.marginLeft = "10px";
            settingInput.style.width = "34px";
            settingInput.style.height = "20px";
            settingInput.style.position = "relative";
            settingInput.style.webkitAppearance = "none";
            settingInput.style.backgroundColor = "#ccc";
            settingInput.style.borderRadius = "34px";
            settingInput.style.transition = "0.4s";

            // Apply the background color based on the saved value
            if (settingInput.checked) {
                settingInput.style.backgroundColor = "#4caf50"; // Green when checked
            } else {
                settingInput.style.backgroundColor = "#ccc"; // Gray when unchecked
            }

            settingInput.addEventListener("change", function() {
                GM_setValue(id, settingInput.checked); // Save the state of the switch
                if (settingInput.checked) {
                    settingInput.style.backgroundColor = "#4caf50"; // Green when checked
                } else {
                    settingInput.style.backgroundColor = "#ccc"; // Gray when unchecked
                }
            });
        }

        // Append the label and input to the setting item
        settingItem.appendChild(settingLabel);
        settingItem.appendChild(settingInput);

        // Append setting item to the corresponding tab content
        tabContent.appendChild(settingItem);
    }

    // Function to add a label that displays stats and can be updated
    function addLabel(labelText, id, tab = "general") {
        const tabContent = menu.querySelector(`#${tab}`);
        if (!tabContent) {
            console.error(`Tab content for "${tab}" not found.`);
            return;
        }

        const labelItem = document.createElement("div");
        labelItem.classList.add("label-item");

        // Create the label element
        const label = document.createElement("span");
        label.id = id; // Add id to the label
        label.textContent = labelText;
        label.style.color = "#ecf0f1";  // Light text color for the label
        labelItem.appendChild(label);

        // Append label to the specified tab content
        tabContent.appendChild(labelItem);

        // Function to update the label text dynamically
        return function updateLabel(newText) {
            label.textContent = newText;
        };
    }

    // Example usage: Adding settings dynamically
    addSetting("checkbox", "Enable Feature", "enable-feature", "", "general");
    addSetting("text", "Username", "username", "Enter your username", "advanced");
    addSetting("switch", "Enable Dark Mode", "dark-mode", "", "general");

    // Example usage: Adding a label
    const updateStatsLabel = addLabel("Stats: Loading...", "stats-label", "general");

    // Simulate updating the label after 3 seconds
    setTimeout(() => {
        updateStatsLabel("Stats: Loaded Successfully!");
    }, 3000);

    // Keybind for toggling menu visibility (Alt + G)
    window.addEventListener("keydown", function(e) {
        if (e.altKey && e.key === "g") {
            menu.style.display = (menu.style.display === "none") ? "block" : "none";
        }
    });

    // Close button functionality
    closeButton.addEventListener("click", function() {
        menu.style.display = "none";
    });
})();

