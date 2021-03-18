const themeNames = ["dark", "light", "auto"];
type ThemeName = (typeof themeNames)[number];
type NamedTheme = {type: "namedTheme", value: ThemeName};
type CustomTheme = {type: "customTheme", value: string};

type ThemeObject = NamedTheme | CustomTheme;

function fromThemeName (themeName: ThemeName): NamedTheme {
    return {type: "namedTheme", value: themeName};
}

function isThemeName(name: string): name is ThemeName {
    return themeNames.includes(name);
}

function isNamedTheme(theme: ThemeObject): theme is NamedTheme {
    return theme.type === "namedTheme";
}

function isCustomTheme(theme: ThemeObject): theme is CustomTheme {
    return theme.type === "customTheme";
}

function mkNamedTheme(name: string, def: ThemeName): NamedTheme {
    return fromThemeName(isThemeName(name) ? name : def);
}
