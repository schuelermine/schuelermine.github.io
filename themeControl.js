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
}

function φ(η, κ, π) {
    document.getElementById(η).style.setProperty(κ, π)

}

function ψ(β) {
    if (document.getElementById("remember-theme-check")?.getAttribute("checked") !== null) {
        window.localStorage.setItem("theme", β);
        document.getElementById("remember-theme-check")?.setAttribute("checked", null);
    }
}

function setTheme(ω) {
    Object.entries(ξ[ω]).forEach(χ => {
        φ("html", χ[0], χ[1])
    })

    ψ(ω);
}
