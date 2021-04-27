"use strict";
var knownThemes = ["dark", "light", "auto"];
function isKnownTheme(name) {
    return knownThemes.includes(name);
}
function isTheme(obj) {
    return obj.type === "namedTheme" && isKnownTheme(obj.value)
        || obj.type === "customTheme" && "value" in obj;
}
function NamedTheme(name) {
    return { type: "namedTheme", value: name };
}
function CustomTheme(str) {
    return { type: "customTheme", value: str };
}
var defaultTheme = NamedTheme("auto");
function parseTheme(str) {
    var theme;
    try {
        var obj = JSON.parse(str);
        theme = isTheme(obj) ? obj : defaultTheme;
    }
    catch (_a) {
        theme = { type: "namedTheme", value: isKnownTheme(str) ? str : "auto" };
    }
    return theme;
}
var themeTable = {
    "dark": ":root {--background-color: #141414; --text-color: white; --link-color: yellow;}",
    "light": ":root {--background-color: white; --text-color: #141414; --link-color: crimson;}",
    "auto": ":root {--background-color: #141414; --text-color: white; --link-color: yellow;} @media (prefers-color-scheme: light) {:root {--background-color: white; --text-color: #141414; --link-color: crimson;}}"
};
function getThemePreference() {
    return localStorage.getItem("theme");
}
function getCurrentTheme() {
    return sessionStorage.getItem("theme");
}
function getTheme() {
    var _a;
    var themeStr = (_a = getCurrentTheme()) !== null && _a !== void 0 ? _a : getThemePreference();
    if (themeStr === null) {
        return defaultTheme;
    }
    return parseTheme(themeStr);
}
function applyTheme(theme) {
    var themeStr = theme.type === "namedTheme" ? themeTable[theme.value] : theme.value;
    var themeNode = document.getElementById("theme");
    if (themeNode !== null) {
        themeNode.innerHTML = themeStr;
    }
}
function setThemePreference(str) {
    localStorage.setItem("theme", str);
}
function setCurrentTheme(str) {
    sessionStorage.setItem("theme", str);
}
function checkboxHandler() {
    var checkbox = document.getElementById("save-theme");
    var wasChecked = checkbox.checked;
    checkbox.checked = false;
    return wasChecked;
}
function saveThemeHandler(theme) {
    var themeStr = JSON.stringify(theme);
    var checked = checkboxHandler();
    if (checked) {
        setThemePreference(themeStr);
    }
    setCurrentTheme(themeStr);
}
function buttonHandler(name) {
    var theme = NamedTheme(name);
    applyTheme(theme);
    saveThemeHandler(theme);
}
applyTheme(getTheme());
