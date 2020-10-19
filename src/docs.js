const fs = require("fs");
const config = require("../config");
const fm = require("front-matter");
const marked = require("marked");

const createDoc = (docPath) => {
	const data = fs.readFileSync(`${config.dev.sourcedir}/${docPath}.md`, "utf8");
	const content = fm(data);
	content.body = marked(content.body);
	content.path = docPath;
	return content;
};

const buildDocPage = (data) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.siteDescription}" />
        <title>${data.attributes.title}</title>
    </head>
    <body>
        <header>
            <a href="/">Go home</a>
        </header>
        <div class="content">
                <h1>${data.attributes.title}</h1>
            <hr />
            ${data.body}
        </div>
    </body>
</html>
`;

const createDocPages = (docs) => {
	docs.forEach((doc) => {
		const outPath = `${config.dev.outdir}/${doc.path}`;
		if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);

		fs.writeFile(`${outPath}/index.html`, buildDocPage(doc), (e) => {
			if (e) throw e;
			console.log(`${doc.path}/index.html created successfully`);
		});
	});
};
module.exports = {
	createDoc,
	createDocPages,
};
