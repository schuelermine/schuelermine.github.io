// Initialize theme

const html = document.getElementById("html");

function setTheme(α) {
    Object.entries(α.colors).forEach((β) => {
        html.style.setProperty(β[0], β[1]);
    });
}

try {
    var α = JSON.parse(sessionStorage.getItem("theme"));
    if (α !== null) {
        setTheme(α);
    } else {
        var β = localStorage.getItem("theme");
        sessionStorage.setItem("theme", β);
        setTheme(JSON.parse(β));
    }
} catch {}