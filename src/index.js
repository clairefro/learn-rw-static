const config = require("../config");
const fs = require("fs");
const { createDoc, createDocPages } = require("./docs.js");
const addHomepage = require("./homepage");

// TODO: skip non-md files
const docs = fs
	.readdirSync(config.dev.sourcedir)
	.map((doc) => doc.slice(0, -3))
	.map((doc) => {
		console.log(`Parsing "${doc}"...`);
		return createDoc(doc);
	});

if (!fs.existsSync(config.dev.outdir)) {
	console.log(`Building output directory "${config.dev.outdir}"...`);
	fs.mkdirSync(config.dev.outdir);
}

createDocPages(docs);
addHomepage(docs);
