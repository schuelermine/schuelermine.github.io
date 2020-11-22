// Themes

const themes = {
    "dark-theme": ["#141414", "white", "yellow"],
    "light-theme": ["white", "#141414", "crimson"]
}

// Initialize theme

var savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    html.style.setProperty("--background-color", themes[savedTheme][0]);
    html.style.setProperty("--text-color", themes[savedTheme][1]);
    html.style.setProperty("--link-color", themes[savedTheme][2]);
}
