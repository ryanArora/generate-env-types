const yargs = require("yargs");
const generateFiles = require("../lib");

const argv = yargs
  .options({
    envPath: {
      default: ".env",
      description: "Path of the .env file",
    },
    definitionPath: {
      default: "typings/env.d.ts",
      description: "Path to write the env.d.ts file",
    },
    examplePath: {
      default: ".env.example",
      description: "Path to write the .example.env file",
    },
    pretty: {
      default: false,
      description: "Whether to format the output with prettier",
    },
  })
  .parseSync();

generateFiles(argv.envPath, argv.definitionPath, argv.examplePath, argv.pretty);
