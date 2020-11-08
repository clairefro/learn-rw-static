const fs = require("fs");
const config = require("../config");
const fm = require("front-matter");
const marked = require("./marked");
const path = require("path");

const { outdir } = config.dev;

const parseDocPath = (docPath) => {
	const parts = docPath.split("/").slice(1); // exclude the relative path "." part at index 0
	const rootDir = parts[0];
	const version = parts[1];
	const lang = parts[2];
	const ext = parts[parts.length - 1].match(/(.\w+)$/)[1];
	const slug = parts[parts.length - 1].slice(0, -ext.length);
	const subdirPath = parts.length > 4 ? path.join(...parts.slice(3, parts.length - 1)) : "";
	return {
		rootDir,
		version,
		lang,
		subdirPath,
		slug,
	};
};
const createDoc = (docPath) => {
	const { version, lang, subdirPath, slug } = parseDocPath(docPath);
	const relativeDocPath = path.resolve(__dirname, "..", docPath.replace(/\.\//, ""));
	const outdirRelPath = [version, lang, subdirPath, slug].join("/").replace(/\/\//g, "/");
	const data = fs.readFileSync(relativeDocPath, "utf8");
	const content = fm(data);

	content.body = marked(content.body);
	content.path = outdirRelPath;
	content.version = version;
	content.lang = lang;
	content.subdirPath = subdirPath;
	content.slug = slug;
	return content;
};

const buildDocPage = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="stylesheet"
      href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.1/build/styles/default.min.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.siteDescription}" />
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <header>
            <a href="../index.html">Go home</a>
        </header>
        <div class="content">
                <h1>${data.attributes.title}</h1>
            <hr />
            ${data.body}
        </div>
    </body>
</html>
`;

const createDocPages = (docs, docsDirName) => {
	docs.forEach((doc) => {
		const outPath = [outdir, docsDirName, doc.path].join("/");

		// create nested dirs if they do not exist
		const outdirPath = path.dirname(outPath);
		if (!fs.existsSync(outdirPath)) {
			console.log(`Building output directory "${outdirPath}"`);
			fs.mkdirSync(outdirPath, { recursive: true });
		}

		fs.writeFile(`${outPath}.html`, buildDocPage(doc), (e) => {
			if (e) throw e;
			console.log(`${outPath}.html created successfully`);
		});
	});
};

module.exports = {
	createDoc,
	createDocPages,
};
