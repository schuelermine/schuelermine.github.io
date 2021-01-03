function setTheme(theme) {
    document.getElementById("theme").href = theme;
}
setTheme(localStorage.getItem("theme") ?? "theme/auto.css");