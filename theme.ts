const knownThemes = ["dark", "light", "auto"];
let themeTable: {[name: string]: string} = {
    "dark": "",
    "light": "",
    "auto": ""
}

type Theme = NamedTheme | CustomTheme;
type NamedTheme = {type: "namedTheme", value: (typeof knownThemes)[number]};
type CustomTheme = {type: "customTheme", value: string};
    //                                               ______
    // Unfortunately, you can't do string => CSSStyleSheet w/o dummy objects,
    // and you can't set an HTMLStyleElement's content to anything except a string.
    // It works, but it's non-self-documenting and feels kinda iffy

function isKnownTheme(name: string): name is NamedTheme["value"] {
    return knownThemes.includes(name);
}

function isTheme(obj: any): obj is Theme {
    return obj.type === "namedTheme" && isKnownTheme(obj.value)
        || obj.type === "customTheme"
}

function getTheme(): Theme {
    let savedTheme: string | null = localStorage.getItem("theme");
    let theme: Theme;
    if (savedTheme === null) {
        theme = {type: "namedTheme", value: "auto"};
    } else {
        try {
            let obj = JSON.parse(savedTheme)
            theme = isTheme(obj) ? obj : {type: "namedTheme", value: "auto"};
        } catch {
            theme = {type: "namedTheme", value: isKnownTheme(savedTheme) ? savedTheme : "auto"};
        }
    }
    return theme;
}

function applyTheme(theme: Theme): void {
    let themeStr = theme.type === "namedTheme" ? theme.value : themeTable[theme.value];
    let themeNode = document.getElementById("theme");
    if (themeNode !== null) {
        themeNode.innerHTML = themeStr
    }
}