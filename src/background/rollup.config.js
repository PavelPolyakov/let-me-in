import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import async from "rollup-plugin-async";

module.exports = {
  input: "./src/main.js",
  plugins: [
    resolve(),
    commonjs({
      include: ["node_modules/**"],

    //   namedExports: {
    //     bluebird: ["promisify"]
    //   }
    }),
    async()
  ],
  output: {
    file: "./dist/main.js",
    format: "iife"
  }
};
