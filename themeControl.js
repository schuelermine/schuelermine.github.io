// Themes

const darkTheme = {
    "colors": {
        "--background-color": "#141414",
        "--text-color": "white",
        "--accent-color": "yellow"
    }
};

const lightTheme = {
    "colors": {
        "--background-color": "white",
        "--text-color": "#141414",
        "--accent-color": "crimson"
    }
};

const noTheme = {
    "colors": {
        "--background-color": null,
        "--text-color": null,
        "--accent-color": null
    }
}

// Elements

const checkbox = document.getElementById("remember-theme-check")

// Set and unset themes

function handleThemeChoice(α) {
    setTheme(α);
    var β = JSON.stringify(α)
    sessionStorage.setItem("theme", β);
    if (checkbox.checked) {
        localStorage.setItem("theme", β);
        checkbox.checked = false
    }
}