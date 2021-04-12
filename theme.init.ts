type NamedTheme = {themeType: "namedTheme", value: "dark" | "light"};
type CustomTheme = {themeType: "customTheme", value: string};
type ThemeObject = 
    //                                               ______
    // Unfortunately, you can't do string => CSSStyleSheet w/o dummy objects,
    // and you can't set an HTMLStyleElement's content to anything except a string.
    // It works, but it's non-self-documenting and feels kinda iffy

let x;