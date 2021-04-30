/** Known theme names. */
const knownThemes = ["dark", "light", "auto"] as const;

/** Represents any theme object. */
type Theme = NamedTheme | CustomTheme;

/** A theme specified by name. */
type NamedTheme = {type: "namedTheme", value: (typeof knownThemes)[number]};

/** A theme specified by CSS code. */
type CustomTheme = {type: "customTheme", value: string};

/** Checks if theme name is known. */
function isKnownTheme(name: string): name is NamedTheme["value"] {
    return (knownThemes as readonly string[]).includes(name);
}

/** Checks for theme object structure. */
function isTheme(obj: any): obj is Theme {
    return obj.type === "namedTheme" && isKnownTheme(obj.value)
        || obj.type === "customTheme" && "value" in obj;
}

/** Gets NamedTheme object from name. */
function NamedTheme(name: NamedTheme["value"]): NamedTheme {
    return {type: "namedTheme", value: name};
}

/** Gets CustomTheme object from CSS code. */
function CustomTheme(str: string): CustomTheme {
    return {type: "customTheme", value: str};
}

/** Default/fallback theme for the website. */
let defaultTheme = NamedTheme("auto")

/** Gets theme object from string, with compatibility for naked theme names. */
function parseTheme(str: string): Theme {
    let theme: Theme;
    try {
        let obj: any = JSON.parse(str)
        theme = isTheme(obj) ? obj : defaultTheme;
    } catch {
        theme = {type: "namedTheme", value: isKnownTheme(str) ? str : "auto"};
    }
    return theme;
}

/** Map from theme name to CSS code for all known named themes. */
let themeTable: {[name: string]: string} = {
    "dark": ":root {--background-color: #141414; --text-color: white; --link-color: yellow;}",
    "light": ":root {--background-color: white; --text-color: #141414; --link-color: crimson;}",
    "auto": ":root {--background-color: #141414; --text-color: white; --link-color: yellow;} @media (prefers-color-scheme: light) {:root {--background-color: white; --text-color: #141414; --link-color: crimson;}}"
};

/** Gets persistent saved theme preference as string. */
function getThemePreference(): string | null {
    return localStorage.getItem("theme");
}

/** Gets currently active theme from session storage as string. */
function getCurrentTheme(): string | null {
    return sessionStorage.getItem("theme");
}

/** Gets currently active theme as object, falls back to theme preference. */
function getTheme(): Theme {
    let themeStr: string | null = getCurrentTheme() ?? getThemePreference();
    if (themeStr === null) {
        return defaultTheme;
    }
    return parseTheme(themeStr);
}

/** Applies theme to website by changing content of a style element. */
function applyTheme(theme: Theme): void {
    let themeCss: string = theme.type === "namedTheme" ? themeTable[theme.value] : theme.value;
    let themeNode: HTMLElement | null = document.getElementById("theme");
    if (themeNode !== null) {
        themeNode.innerHTML = themeCss;
    }
}

/** Sets persistent theme preference in local storage. */
function setThemePreference(str: string): void {
    localStorage.setItem("theme", str);
}

/** Sets currently active theme in session storage. */
function setCurrentTheme(str: string): void {
    sessionStorage.setItem("theme", str);
}

/** Gets checkbox state, sets it to unchecked, and returns the original state. */
function checkboxHandler(): boolean {
    let checkbox: HTMLInputElement = document.getElementById("save-theme") as HTMLInputElement;
    let wasChecked: boolean = checkbox.checked
    checkbox.checked = false
    return wasChecked
}

/** Sets current theme, theme preference if needed, and resets checkbox. */
function saveThemeHandler(theme: Theme): void {
    let themeStr: string = JSON.stringify(theme);
    let checked: boolean = checkboxHandler();
    if (checked) {
        setThemePreference(themeStr);
    }
    setCurrentTheme(themeStr);
}

/**
 * Applies named theme with specified name, saves it, and resets the checkbox.
 * Intended to be called by theme control buttons via onclick event.
 */
function buttonHandler(name: NamedTheme["value"]): void {
    let theme: NamedTheme = NamedTheme(name);
    applyTheme(theme);
    saveThemeHandler(theme);
}

// Initialize theme on load.
applyTheme(getTheme());