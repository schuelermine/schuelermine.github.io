"use strict";
var knownThemes = ["dark", "light", "auto"];
var themeTable = {
    "dark": "",
    "light": "",
    "auto": ""
};
function isKnownTheme(name) {
    return knownThemes.includes(name);
}
function isTheme(obj) {
    return obj.type === "namedTheme" && isKnownTheme(obj.value)
        || obj.type === "customTheme";
}
function getTheme() {
    var savedTheme = localStorage.getItem("theme");
    var theme;
    if (savedTheme === null) {
        theme = { type: "namedTheme", value: "auto" };
    }
    else {
        try {
            var obj = JSON.parse(savedTheme);
            theme = isTheme(obj) ? obj : { type: "namedTheme", value: "auto" };
        }
        catch (_a) {
            theme = { type: "namedTheme", value: isKnownTheme(savedTheme) ? savedTheme : "auto" };
        }
    }
    return theme;
}
function applyTheme(theme) {
    var themeStr = theme.type === "namedTheme" ? theme.value : themeTable[theme.value];
    var themeNode = document.getElementById("theme");
    if (themeNode !== null) {
        themeNode.innerHTML = themeStr;
    }
}
