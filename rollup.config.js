import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps"

export default {
  input: "./lib/index.ts",
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    sourceMaps()
  ],
  output: [
    {
      format: "cjs",
      file: "lib/index.cjs.js",
      sourcemap: true
    },
    {
      format: "es",
      file: "lib/index.esm.js",
      sourcemap: true
    },
    {
      format: "iife",
      file: "lib/index.global.js",
      sourcemap: true,
      name: 'RENDER'
    },
  ]
};
