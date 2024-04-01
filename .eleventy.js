const sass = require("sass");;
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const slug = require("slug")

const markdownItOptions = {
    html: true
};

const slugifyOptions = {
    lowercase: true,
};

const markdownItAnchorOptions = {
    slugify: it => slug(it, slugifyOptions)
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAnchor, markdownItAnchorOptions);

module.exports = function (eleventyConfig) {
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: async function (inputContent) {
            let result = sass.compileString(inputContent);
            return async (data) => {
                return result.css;
            };
        }
    });
    eleventyConfig.setLibrary("md", markdownLib);
    return {
        dir: {
            input: "src",
            output: "docs"
        }
    };
}
