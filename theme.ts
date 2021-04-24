const knownThemes = ['dark', 'light', 'auto'];
let themeTable: {[name: string]: string} = {
    'dark': ':root {--background-color: #141414; --text-color: white; --link-color: yellow;}',
    'light': ':root {--background-color: white; --text-color: #141414; --link-color: crimson;}',
    'auto': ':root {--background-color: #141414; --text-color: white; --link-color: yellow;} @media (prefers-color-scheme: light) {:root {--background-color: white; --text-color: #141414; --link-color: crimson;}}'
}

type Theme = NamedTheme | CustomTheme;
type NamedTheme = {type: 'namedTheme', value: (typeof knownThemes)[number]};
type CustomTheme = {type: 'customTheme', value: string};

function isKnownTheme(name: string): name is NamedTheme['value'] {
    return knownThemes.includes(name);
}
function isTheme(obj: any): obj is Theme {
    return obj.type === 'namedTheme' && isKnownTheme(obj.value)
        || obj.type === 'customTheme'
}

function NamedTheme(name: NamedTheme['type']): NamedTheme {
    return {type: 'namedTheme', value: name}
}
function CustomTheme(str: string): CustomTheme {
    return {type: 'customTheme', value: str}
}

function getSavedTheme(): Theme {
    let savedTheme: string | null = localStorage.getItem('theme');
    let theme: Theme;
    if (savedTheme === null) {
        theme = {type: 'namedTheme', value: 'auto'};
    } else {
        try {
            let obj = JSON.parse(savedTheme)
            theme = isTheme(obj) ? obj : {type: 'namedTheme', value: 'auto'};
        } catch {
            theme = {type: 'namedTheme', value: isKnownTheme(savedTheme) ? savedTheme : 'auto'};
        }
    }
    return theme;
}

function setTheme(theme: Theme): void {
    let themeStr = theme.type === 'namedTheme' ? themeTable[theme.value] : theme.value;
    let themeNode = document.getElementById('theme');
    if (themeNode !== null) {
        themeNode.innerHTML = themeStr
    }
}

setTheme(getSavedTheme());
