const fs = require("fs");
const config = require("../config");
const fm = require("front-matter");
const marked = require("marked");

const createDoc = docPath => {
  const data = fs.readFileSync(`${config.dev.sourcedir}/${docPath}.md`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = docPath;
  return content;
};

module.exports = createDoc;