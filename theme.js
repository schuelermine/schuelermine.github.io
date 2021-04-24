"use strict";
var knownThemes = ['dark', 'light', 'auto'];
var themeTable = {
    'dark': ':root {--background-color: #141414; --text-color: white; --link-color: yellow;}',
    'light': ':root {--background-color: white; --text-color: #141414; --link-color: crimson;}',
    'auto': ':root {--background-color: #141414; --text-color: white; --link-color: yellow;} @media (prefers-color-scheme: light) {:root {--background-color: white; --text-color: #141414; --link-color: crimson;}}'
};
function isKnownTheme(name) {
    return knownThemes.includes(name);
}
function isTheme(obj) {
    return obj.type === 'namedTheme' && isKnownTheme(obj.value)
        || obj.type === 'customTheme';
}
function NamedTheme(name) {
    return { type: 'namedTheme', value: name };
}
function CustomTheme(str) {
    return { type: 'customTheme', value: str };
}
function getSavedTheme() {
    var savedTheme = localStorage.getItem('theme');
    var theme;
    if (savedTheme === null) {
        theme = { type: 'namedTheme', value: 'auto' };
    }
    else {
        try {
            var obj = JSON.parse(savedTheme);
            theme = isTheme(obj) ? obj : { type: 'namedTheme', value: 'auto' };
        }
        catch (_a) {
            theme = { type: 'namedTheme', value: isKnownTheme(savedTheme) ? savedTheme : 'auto' };
        }
    }
    return theme;
}
function setTheme(theme) {
    var themeStr = theme.type === 'namedTheme' ? themeTable[theme.value] : theme.value;
    var themeNode = document.getElementById('theme');
    if (themeNode !== null) {
        themeNode.innerHTML = themeStr;
    }
}
setTheme(getSavedTheme());
