import { compileString } from "npm:sass";
import markdownIt from "npm:markdown-it";
import markdownItAnchor from "npm:markdown-it-anchor";
import slug from "npm:slug";
import syntaxHighlight from "npm:@11ty/eleventy-plugin-syntaxhighlight";

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
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/*.css");
    eleventyConfig.addPassthroughCopy("src/fonts/*.ttf")
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: function (inputContent) {
            const result = compileString(inputContent);
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
