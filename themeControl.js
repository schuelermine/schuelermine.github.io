// Themes

const ξ = {
    "dark-theme": {
        "--background-color": "rgb(20, 20, 20)",
        "--text-color": "white",
        "--link-color": "yellow"
    },
    "light-theme": {
        "--background-color": "white",
        "--text-color": "rgb(20, 20, 20)",
        "--link-color": "crimson"
    },
    "system-theme": {
        "--background-color": null,
        "--text-color": null,
        "--link-color": null
    }
};

// Function to set a style

function φ(η, κ, π) {
    document.getElementById(η).style.setProperty(κ, π);
}

// Function to save theme in local storage
// if "Remember Theme" is checked

function ψ(β) {
    if (document.getElementById("remember-theme-check")?.getAttribute("checked") !== null) {
        window.localStorage.setItem("theme", β);
        document.getElementById("remember-theme-check")?.setAttribute("checked", null);
    }
}

// Looks up theme name in ξ

function setTheme(ω) {
    Object.entries(ξ[ω]).forEach(χ => {
        φ("html", χ[0], χ[1]);
    });

    ψ(ω);
}

// Initialize theme

var θ = localStorage.getItem("theme");
if (θ) {
    setTheme(θ);
}
