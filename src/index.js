const config = require("../config");
const fs = require("fs");
const { createDoc, createDocPages } = require("./docs.js");
const addHomepage = require("./homepage");

const { outdir, sourcedir } = config.dev;

// TODO: skip non-md files
const docs = fs
	.readdirSync(sourcedir)
	.map((doc) => doc.slice(0, -3))
	.map((doc) => {
		console.log(`Parsing "${doc}"...`);
		return createDoc(doc);
	});

if (!fs.existsSync(outdir)) {
	console.log(`Building output directory "${outdir}"...`);
	fs.mkdirSync(outdir);
}

createDocPages(docs, "docs");
addHomepage(docs, "docs");
