const fs = require("fs");
const config = require("../config");

const { outdir } = config.dev;

const buildHomepage = (docs, docsDirName) => `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${config.siteDescription}" />
        <title>${config.siteName}</title>
    </head>
    <body>
        <div>
            <header>
                <h1>${config.siteName}</h1>
                <p>${config.siteDescription}</p>
                <hr />
            </header>
            <div class="docs">
                ${docs
					.map(
						(doc) => `<div class="doc">
                    <h3><a href="./${docsDirName}/${doc.path}.html">${doc.attributes.title}</a></h3>
                    </div>`
					)
					.join("")}
            </div>
            <footer>
                ${`<p>© ${new Date().getFullYear()} - ${config.siteAuthor} </p>`}
            </footer>
        </div>
    </body>
</html>
`;

const addHomePage = (docs, docsDirName) => {
	fs.writeFile(`${outdir}/index.html`, buildHomepage(docs, docsDirName), (e) => {
		if (e) throw e;
		console.log(`index.html was created successfully`);
	});
};

module.exports = addHomePage;
