const config = require("../config");
const fs = require("fs");
const { createDoc, createDocPages } = require("./docs.js");
const addHomepage = require("./homepage");
const copyDir = require("./util/copyDir");
const walk = require("./util/walk");

const { outdir, sourcedir, docsDirName, assetsDir } = config.dev;

const docs = walk(sourcedir)
	.filter((file) => file.match(/\.md$/)) // only target markdown files
	.map((docPath) => {
		console.log(`Parsing "${docPath}"...`);
		return createDoc(docPath);
	});

// console.log({ docs });

if (!fs.existsSync(outdir)) {
	console.log(`Building output directory "${outdir}"...`);
	fs.mkdirSync(outdir);
}

createDocPages(docs, docsDirName);
addHomepage(docs, docsDirName);

// copy assets to outdir
const assetsOutdir = [outdir, "assets"].join("/");
copyDir(assetsDir, assetsOutdir);

console.log("Website generated!");
