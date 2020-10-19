const config = require("../config");
const fs = require("fs");

const docs = fs
  .readdirSync(config.dev.sourcedir)
  .map(doc => doc.slice(0, -3));

console.log(docs);