savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.getElementById("html").className = savedTheme;
}