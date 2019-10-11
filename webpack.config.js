const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: "cheap-eval-source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  devServer: {
    // HMR
    hot: false,

    port: 5000,

    contentBase: resolve(__dirname, "."),
    // match the output path

    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      filename: "index.html"
    })
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
