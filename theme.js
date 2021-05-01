"use strict";
/** Known theme names. */
var knownThemes = ["dark", "light", "auto"];
/** Checks if theme name is known. */
function isKnownTheme(name) {
    return knownThemes.includes(name);
}
/** Checks for theme object structure. */
function isTheme(obj) {
    return obj.type === "namedTheme" && isKnownTheme(obj.value)
        || obj.type === "customTheme" && "value" in obj;
}
/** Gets NamedTheme object from name. */
function NamedTheme(name) {
    return { type: "namedTheme", value: name };
}
/** Gets CustomTheme object from CSS code. */
function CustomTheme(str) {
    return { type: "customTheme", value: str };
}
/** Default/fallback theme for the website. */
var defaultTheme = NamedTheme("auto");
/** Gets theme object from string, with compatibility for naked theme names. */
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
/** Map from theme name to CSS code for all known named themes. */
var themeTable = {
    "dark": ":root {--background-color: #141414; --text-color: white; --link-color: yellow;}",
    "light": ":root {--background-color: white; --text-color: #141414; --link-color: crimson;}",
    "auto": ":root {--background-color: #141414; --text-color: white; --link-color: yellow;} @media (prefers-color-scheme: light) {:root {--background-color: white; --text-color: #141414; --link-color: crimson;}}"
};
/** Gets persistent saved theme preference as string. */
function getThemePreference() {
    return localStorage.getItem("theme");
}
/** Gets currently active theme from session storage as string. */
function getCurrentTheme() {
    return sessionStorage.getItem("theme");
}
/** Gets currently active theme as object, falls back to theme preference. */
function getTheme() {
    var _a;
    var themeStr = (_a = getCurrentTheme()) !== null && _a !== void 0 ? _a : getThemePreference();
    if (themeStr === null) {
        return defaultTheme;
    }
    return parseTheme(themeStr);
}
/** Applies theme to website by changing content of a style element. */
function applyTheme(theme) {
    var themeCss = theme.type === "namedTheme" ? themeTable[theme.value] : theme.value;
    var themeNode = document.getElementById("theme");
    if (themeNode !== null) {
        themeNode.innerHTML = themeCss;
    }
}
/** Sets persistent theme preference in local storage. */
function setThemePreference(str) {
    localStorage.setItem("theme", str);
}
/** Sets currently active theme in session storage. */
function setCurrentTheme(str) {
    sessionStorage.setItem("theme", str);
}
/** Gets checkbox state, sets it to unchecked, and returns the original state. */
function checkboxHandler() {
    var checkbox = document.getElementById("save-theme");
    var wasChecked = checkbox.checked;
    checkbox.checked = false;
    return wasChecked;
}
/** Sets current theme, theme preference if needed, and resets checkbox. */
function saveThemeHandler(theme) {
    var themeStr = JSON.stringify(theme);
    var checked = checkboxHandler();
    if (checked) {
        setThemePreference(themeStr);
    }
    setCurrentTheme(themeStr);
}
/**
 * Applies named theme with specified name, saves it, and resets the checkbox.
 * Intended to be called by theme control buttons via onclick event.
 */
function buttonHandler(name) {
    var theme = NamedTheme(name);
    applyTheme(theme);
    saveThemeHandler(theme);
}
// Initialize theme on load.
applyTheme(getTheme());
//# sourceMappingURL=theme.js.map