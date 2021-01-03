function saveTheme(theme) {
    if (document.getElementById("save-theme").checked) {
        localStorage.setItem("theme", theme);
    }
}
function setAndSaveTheme(theme) {
    setTheme(theme);
    saveTheme(theme);
}