const fs = require("fs-extra");
const { parse } = require("dotenv");
const prettier = require("prettier");

/**
 * Generate env.d.ts and .example.env files from .env file
 * @param {string} envPath
 * @param {string} definitionPath
 * @param {string} examplePath
 */
module.exports = function generateFiles(envPath, definitionPath, examplePath) {
  const env = parse(fs.readFileSync(envPath));
  const keys = Object.keys(env);

  const lines = keys.map((key) => `readonly ${key}: string;`).join("");
  const unformatted = `namespace NodeJS{interface ProcessEnv{${lines}}}`;

  prettier.resolveConfig(definitionPath).then((config) => {
    if (config === null) config = {};

    const definitionTxt = prettier.format(unformatted, {
      ...config,
      parser: "typescript",
    });
    const exampleTxt = keys.map((key) => `${key}=value\n`).join("");

    console.log(definitionPath, examplePath);

    if (definitionPath) fs.outputFile(definitionPath, definitionTxt);
    if (examplePath) fs.outputFile(examplePath, exampleTxt);
  });
};
