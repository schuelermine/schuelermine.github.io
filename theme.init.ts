type ThemeObj = NamedTheme | CustomTheme;
type NamedTheme = {type: "namedTheme", value: "dark" | "light" | "auto"};
type CustomTheme = {type: "customTheme", value: string};
// TODO: This is very wet, please make dry.
function mkNamedTheme(name: string): NamedTheme {
    switch (name) {
        case "dark":
            return {type: "namedTheme", value: "dark"}
        case "light":
            return {type: "namedTheme", value: "light"}
        case "auto":
            return {type: "namedTheme", value: "auto"}
        default:
            return {type: "namedTheme", value: "auto"}
    }
}

let themeStr = localStorage.getItem("theme");
let themeObj : ThemeObj;
try {
    themeObj = JSON.parse(themeStr);
} catch {
    themeObj = mkNamedTheme(themeStr)
    themeStr = JSON.stringify({type: "namedTheme", value: themeStr})
    localStorage.setItem("theme", themeStr); // ? maybe confusing use of variables
}