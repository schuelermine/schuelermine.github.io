function setTheme(ω) {
    document.getElementById("html").classList.remove("system-theme", "dark-theme", "light-theme");
    document.getElementById("html").classList.add(ω);
    if (document.getElementById("remember-theme-check").checked) {
        localStorage.setItem("theme", ω);
        document.getElementById("remember-theme-check").checked = false;
    }
}