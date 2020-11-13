function setTheme(theme) {
    document.getElementById("html").classList.remove("system-theme", "dark-theme", "light-theme");
    document.getElementById("html").classList.add(theme);
    if (document.getElementById("remember-theme-check").checked) {
        localStorage.setItem("theme", theme);
        document.getElementById("remember-theme-check").checked = false;
    }
}