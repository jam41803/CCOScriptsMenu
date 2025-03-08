// ==UserScript==
// @name         Kenny"s CCO Menu
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

(function () {
    const version = "1"
    'use strict';
    var primaryColor = GM_getValue("primaryColor", "#1abc9c");
    var primaryAccent = GM_getValue("primaryAccent", "#1abc9c");
    var secondaryColor = GM_getValue("secondaryColor", "#34495e");
    var backgroundColor = GM_getValue("backgroundColor", "#2c3e50");
    var closeButtonColor = GM_getValue("closeButtonColor", "#e74c3c");
    var textColor = GM_getValue("textColor", "#ffffff");

    function loadVariables() {
        primaryColor = GM_getValue("primaryColor", "#1abc9c");
        primaryAccent = GM_getValue("primaryAccent", "#1abc9c");
        secondaryColor = GM_getValue("secondaryColor", "#34495e");
        backgroundColor = GM_getValue("backgroundColor", "#2c3e50");
        closeButtonColor = GM_getValue("closeButtonColor", "#e74c3c");
        textColor = GM_getValue("textColor", "#ffffff");
    }

    const menu = document.createElement("div");
    menu.innerHTML = `
        <div id="settings-menu" class="settings-menu">
            <h3 id="title"> Kenny's CCO Menu </h3>
            <div id="tabs" class="tabs">
                <!-- Tabs will be dynamically added here -->
            </div>
            <div id="settings-content">
                <!-- Tab content will be dynamically added here -->
            </div>
            <div class="setting-item">
                <div id="close-label">Toggle with ALT+A</div>
                <button id="close-menu">Close</button>
            </div>
        </div>
    `;

    const title = menu.querySelector("#title");
    title.style.margin = "0"
    title.style.color = primaryAccent;
    title.textContent = "Kenny's CCO Menu v" + version;

    Object.assign(menu.style, {
        background: backgroundColor,
        color: "white",
        padding: "15px",
        borderRadius: "10px",
        position: "absolute",
        top: "50px",
        left: "50px",
        fontFamily: "Arial, sans-serif",
        zIndex: 9999,
        overflow: "auto",
        height: "50%",
        width: "30%",
        maxHeight: "80vh",
        overflowY: "auto"
    });

    const tabs = menu.querySelector("#tabs");
    Object.assign(tabs.style, {
        display: "flex",
        marginBottom: "10px",
        justifyContent: "center",
        backgroundColor: secondaryColor,
        borderRadius: "5px",
        padding: "5px",
        zIndex: "1000"
    });


    const tabStyle = {
        padding: "5px 10px",
        backgroundColor: secondaryColor,
        border: `2px solid ${secondaryColor}`,
        color: textColor,
        borderRadius: "5px",
        cursor: "pointer",
        textAlign: "center",
        flex: "1",
        margin: "0px",
        fontSize: "14px",
        transition: "background-color 0.3s ease, color 0.3s ease"
    };


    const activeTabStyle = {
        backgroundColor: primaryColor,
        borderColor: primaryAccent,
        color: "#fff"
    };

    // Add hover effect for tabs
    const tabHoverStyle = {
        backgroundColor: backgroundColor,
        color: textColor
    };


    const settingsContent = menu.querySelector("#settings-content");
    settingsContent.style.position = "relative";
    settingsContent.style.display = "grid";

    // Add hover effect for close button
    const closeButton = menu.querySelector("#close-menu");
    closeButton.style.backgroundColor = closeButtonColor;
    closeButton.style.border = "none";
    closeButton.style.color = textColor;
    closeButton.style.padding = "8px 12px";
    closeButton.style.cursor = "pointer";
    closeButton.style.borderRadius = "5px";
    closeButton.style.position = "absolute";
    closeButton.style.bottom = "15px";
    closeButton.style.right = "15px";

    const closeLabel = menu.querySelector("#close-label");
    closeLabel.style.left = "15px";
    closeLabel.style.bottom = "15px";
    closeLabel.style.position = "absolute";

    function makeDraggable(element) {
        let isDragging = false;
        let offsetX, offsetY;

        element.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                const left = e.clientX - offsetX;
                const top = e.clientY - offsetY;
                element.style.left = `${left}px`;
                element.style.top = `${top}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            element.style.cursor = "grab";
        });
    }


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

    restoreMenuPosition();

    document.addEventListener("mouseup", saveMenuPosition);


    document.body.appendChild(menu);

    function addTab(tabId, tabTitle) {
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.setAttribute("data-tab", tabId);
        tabButton.textContent = tabTitle;

        Object.assign(tabButton.style, tabStyle);

        tabButton.addEventListener("mouseover", () => {
            Object.assign(tabButton.style, tabHoverStyle);
        });

        tabButton.addEventListener("mouseout", () => {
            if (!tabButton.classList.contains("active")) {
                Object.assign(tabButton.style, tabStyle);
            }
        });

        tabButton.addEventListener("click", () => {
            const tabContents = menu.querySelectorAll(".tab-content");
            tabContents.forEach(content => {
                content.style.display = "none";
                content.style.opacity = "0";
                content.style.transform = "translateX(-100%)";
            });

            const activeTab1 = menu.querySelector(`#${tabId + "1"}`);
            activeTab1.style.display = "block";
            activeTab1.style.opacity = "1";
            activeTab1.style.transform = "translateX(0)";

            const activeTab2 = menu.querySelector(`#${tabId + "2"}`);
            activeTab2.style.display = "block";
            activeTab2.style.opacity = "1";
            activeTab2.style.transform = "translateX(0)";

            const allTabButtons = tabs.querySelectorAll(".tab-button");
            allTabButtons.forEach(button => {
                button.classList.remove("active");
                Object.assign(button.style, tabStyle);
            });
            tabButton.classList.add("active");
            Object.assign(tabButton.style, activeTabStyle);
        });

        tabs.appendChild(tabButton);

        const tabContent = document.createElement("div");
        tabContent.id = tabId + "1";
        tabContent.classList.add("tab-content");
        tabContent.style.display = "none";
        tabContent.style.position = "absolute";
        tabContent.style.top = "0";
        tabContent.style.left = "0";
        tabContent.style.width = "50%";
        tabContent.style.height = "100%";

        const tabContent2 = document.createElement("div");
        tabContent2.id = tabId + "2";
        tabContent2.classList.add("tab-content");
        tabContent2.style.display = "none";
        tabContent2.style.position = "absolute";
        tabContent2.style.top = "0";
        tabContent2.style.right = "0";
        tabContent2.style.width = "50%";
        tabContent2.style.height = "100%";

        settingsContent.appendChild(tabContent);
        settingsContent.appendChild(tabContent2);

        if (tabs.querySelectorAll(".tab-button").length === 1) {
            tabButton.classList.add("active");
            Object.assign(tabButton.style, activeTabStyle);
            tabContent.style.display = "block";
            tabContent.style.opacity = "1";
            tabContent2.style.display = "block";
            tabContent2.style.opacity = "1";
        }
    }

    function addCustomizeTab(tabId, tabTitle) {
        const tabButton = document.createElement("button");
        tabButton.classList.add("tab-button");
        tabButton.setAttribute("data-tab", tabId);
        tabButton.textContent = tabTitle;

        Object.assign(tabButton.style, tabStyle);

        tabButton.addEventListener("mouseover", () => {
            Object.assign(tabButton.style, tabHoverStyle);
        });

        tabButton.addEventListener("mouseout", () => {
            if (!tabButton.classList.contains("active")) {
                Object.assign(tabButton.style, tabStyle);
            }
        });

        tabButton.addEventListener("click", () => {
            const tabContents = menu.querySelectorAll(".tab-content");
            tabContents.forEach(content => {
                content.style.display = "none";
                content.style.opacity = "0";
                content.style.transform = "translateX(-100%)";
            });

            const activeTab1 = menu.querySelector(`#${tabId + "1"}`);
            activeTab1.style.display = "block";
            activeTab1.style.opacity = "1";
            activeTab1.style.transform = "translateX(0)";

            const allTabButtons = tabs.querySelectorAll(".tab-button");
            allTabButtons.forEach(button => {
                button.classList.remove("active");
                Object.assign(button.style, tabStyle);
            });
            tabButton.classList.add("active");
            Object.assign(tabButton.style, activeTabStyle);
        });

        tabs.appendChild(tabButton);

        const tabContent = document.createElement("div");
        tabContent.id = tabId + "1";
        tabContent.classList.add("tab-content");
        tabContent.style.display = "none";
        tabContent.style.position = "absolute";
        tabContent.style.top = "0";
        tabContent.style.left = "0";

        settingsContent.appendChild(tabContent);

        if (tabs.querySelectorAll(".tab-button").length === 1) {
            tabButton.classList.add("active");
            Object.assign(tabButton.style, activeTabStyle);
            tabContent.style.display = "block";
            tabContent.style.opacity = "1";
            tabContent2.style.display = "block";
            tabContent2.style.opacity = "1";
        }
    }

    function addSetting(type, label, id, placeholder = "", tab = "general", contentSide = "1") {
        const tabContent = menu.querySelector(`#${tab + contentSide}`);
        if (!tabContent) {
            console.error(`Tab content for "${tab}" not found.`);
            return;
        }

        const settingItem = document.createElement("div");
        settingItem.classList.add("setting-item");
        settingItem.style.display = "flex"
        if (contentSide == 1) {
            settingItem.style.justifyContent = "flex-start"
        } else {
            settingItem.style.justifyContent = "flex-start"
        }

        const settingLabel = document.createElement("label");
        settingLabel.setAttribute("for", id);
        settingLabel.textContent = label;
        settingLabel.style.color = textColor;

        let settingInput;

        if (type === "number") {
            settingInput = document.createElement("input");
            settingInput.type = "number";
            settingInput.placeholder = placeholder;
            settingInput.id = id;
            settingInput.value = GM_getValue(id, "");
            settingInput.style.margin = "5px 5px 5px 5px"
            settingInput.style.border = `1px solid ${primaryAccent}`
            settingInput.style.width = "50%";
            settingInput.style.marginLeft = "auto"


            settingInput.addEventListener("input", function () {
                GM_setValue(id, settingInput.value);
                loadVariables()
            });
        } else if (type === "text") {
            settingInput = document.createElement("input");
            settingInput.type = "text";
            settingInput.placeholder = placeholder;
            settingInput.id = id;
            settingInput.style.marginLeft = "auto"
            settingInput.value = GM_getValue(id, "");
            settingInput.style.margin = "5px 5px 5px 5px"
            settingInput.style.border = `1px solid ${primaryAccent}`


            settingInput.addEventListener("input", function () {
                GM_setValue(id, settingInput.value);
                loadVariables()
            });
        } else if (type === "switch") {
            settingInput = document.createElement("input");
            settingInput.type = "checkbox";
            settingInput.classList.add("switch");
            settingInput.id = id;
            settingInput.checked = GM_getValue(id, false);

            settingItem.appendChild(settingLabel);
            settingItem.appendChild(settingInput);

            settingInput.style.marginLeft = "10px";
            settingInput.style.width = "34px";
            settingInput.style.height = "20px";
            settingInput.style.position = "relative";
            settingInput.style.webkitAppearance = "none";
            settingInput.style.backgroundColor = "#ccc";
            settingInput.style.borderRadius = "34px";
            settingInput.style.transition = "0.4s";
            settingInput.style.right = "5px"
            settingInput.style.border = `1px solid ${primaryAccent}`
            settingInput.style.marginLeft = "auto"

            if (settingInput.checked) {
                settingInput.style.backgroundColor = primaryColor;
            } else {
                settingInput.style.backgroundColor = "#ccc";
            }

            settingInput.addEventListener("change", function () {
                GM_setValue(id, settingInput.checked);
                if (settingInput.checked) {
                    settingInput.style.backgroundColor = primaryColor;
                } else {
                    settingInput.style.backgroundColor = "#ccc";
                }
                loadVariables()
            });
        } else if (type === "dropdown") {
            settingInput = document.createElement("select");
            settingInput.style.marginLeft = "5px"
            settingInput.id = id;
            settingInput.style.border = `1px solid ${primaryAccent}`
            settingInput.style.marginLeft = "auto"
            placeholder.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                settingInput.appendChild(optionElement);
            });

            settingInput.value = GM_getValue(id, placeholder[0].value);

            settingInput.addEventListener("change", function () {
                GM_setValue(id, settingInput.value);
                loadVariables()
            });
        }

        settingItem.appendChild(settingLabel);
        settingItem.appendChild(settingInput);

        tabContent.appendChild(settingItem);
    }

    function addLabel(labelText, id, tab = "general", contentSide = "2") {
        const tabContent = menu.querySelector(`#${tab + contentSide}`);
        if (!tabContent) {
            console.error(`Tab content for "${tab}" not found.`);
            return;
        }

        const labelItem = document.createElement("div");
        labelItem.classList.add("label-item");

        const label = document.createElement("span");
        label.id = id;
        label.textContent = labelText;
        label.style.color = "#ecf0f1";
        labelItem.appendChild(label);
        if (contentSide == 1) {
            labelItem.style.justifyContent = "flex-end"
        } else {
            labelItem.style.justifyContent = "flex-start"
        }
        tabContent.appendChild(labelItem);

        return function updateLabel(newText) {
            label.textContent = newText;
        };
    }

    addTab("general", "General");
    addTab("cases", "Cases");
    addTab("casino", "Casino");
    addTab("martingale", "Martingale");
    addCustomizeTab("customize", "Customization")


    // addSetting(type, label, id, placeholder = "", tab = "general", contentSide = "1")
    addSetting("switch", "Auto Click", "toggleAutoClick", "", "general")
    addSetting("switch", "Auto Vault", "toggleVault", "", "general")
    addSetting("switch", "Auto Collect Armory", "autoArmory", "", "general");
    addSetting("dropdown", "Click Type", "clickType", [
        { value: "money", label: "Money" },
        { value: "cases", label: "Cases" }
    ], "general", "2")

    addSetting("text", "Primary Color", "primaryColor", primaryColor, "customize", "1")
    addSetting("text", "Secondary Color", "secondaryColor", secondaryColor, "customize", "1")
    addSetting("text", "Primary Accent", "primaryAccent", primaryAccent, "customize", "1")
    addSetting("text", "Background Color", "backgroundColor", backgroundColor, "customize", "1")
    addSetting("text", "Close Button Color", "closeButtonColor", closeButtonColor, "customize", "1")
    addSetting("text", "Text Color", "textColor", textColor, "customize", "1")

    addSetting("number", "Sell Price", "sellPrice", "250", "cases", "1");
    addSetting("switch", "Enable Auto Sell", "toggleSell", "", "cases");
    addSetting("dropdown", "Currency", "currency", [
        { value: "money", label: "Money" },
        { value: "tokens", label: "Tokens" }
    ], "cases", "1")
    addSetting("switch", "Enable Case Selling", "toggleCaseSell", "", "cases")

    addSetting("switch", "Auto Coinflip", "autoCoinflip", "", "casino")
    addSetting("switch", "Auto Dice", "autoDice", "", "casino")
    addSetting("switch", "Auto BJ", "autoBJ", "", "casino")
    addSetting("switch", "Auto Upgrade", "autoUpgrade", "", "casino")
    addSetting("number", "Coinflip Bet", "coinflipBet", "100", "casino", "2")
    addSetting("number", "Dice Bet", "diceBet", "100", "casino", "2")
    addSetting("number", "BJ Bet", "bjBet", "100", "casino", "2")
    addSetting("number", "Upgrade Multiplier", "upgradeMult", "2", "casino", "2")
    addSetting("number", "Upgrade Tokens", "upgradeTokens", "1", "casino", "2")


    const updateStatsLabel = addLabel("Stats: Loading...", "stats-label", "general");

    setTimeout(() => {
        updateStatsLabel("Stats: Loaded Successfully!");
    }, 3000);

    window.addEventListener("keydown", function (e) {
        if (e.altKey && e.key === "a") {
            menu.style.display = (menu.style.display === "none") ? "block" : "none";
        }
    });

    closeButton.addEventListener("click", function () {
        menu.style.display = "none";
    });


    setInterval()
})();

