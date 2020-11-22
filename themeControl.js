// Elements

const html = document.getElementById("html")
const checkbox = document.getElementById("remember-theme-check")

// Set and unset themes

function setTheme(ω) {
    html.style.setProperty("--background-color", themes[ω][0]);
    html.style.setProperty("--text-color", themes[ω][1]);
    html.style.setProperty("--link-color", themes[ω][2]);
    if (checkbox.checked) {
        window.localStorage.setItem("theme", ω);
        checkbox.checked = false;
    }
}

function unsetTheme() {
    html.style.removeProperty("--background-color");
    html.style.removeProperty("--text-color");
    html.style.removeProperty("--link-color");

    if (checkbox.checked) {
        window.localStorage.removeItem("theme");
        checkbox.checked = false;
    }
}
