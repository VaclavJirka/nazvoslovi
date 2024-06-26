const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "main.js",
  },
  mode: "production",
  devtool: "source-map",
});
