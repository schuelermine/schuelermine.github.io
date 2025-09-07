import * as sass from "npm:sass";
import markdownIt from "npm:markdown-it";
import markdownItAnchor from "npm:markdown-it-anchor";
import slug from "npm:slug"

const markdownItOptions = {
    html: true
};

const slugOptions = {
    lowercase: true,
};

const markdownItAnchorOptions = {
    slugify: it => slug(it, slugOptions)
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAnchor, markdownItAnchorOptions);

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/fonts/*.ttf")
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: function (inputContent) {
            const result = sass.compileString(inputContent);
            return (_) => {
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
