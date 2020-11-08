// from SO answer: https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search#16684530

const fs = require("fs");

const walk = (dir) => {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		file = dir + "/" + file;
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			/* Recurse into a subdirectory */
			results = results.concat(walk(file));
		} else {
			/* Is a file */
			results.push(file);
		}
	});
	return results;
};

module.exports = walk;
