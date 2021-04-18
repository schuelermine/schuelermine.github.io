"use strict";
var knownThemes = ["dark", "light", "auto"];
function isKnownTheme(name) {
    return knownThemes.includes(name);
}
function isTheme(obj) {
    return obj.type === "namedTheme" && isKnownTheme(obj.value)
        || obj.type === "customTheme";
}
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
