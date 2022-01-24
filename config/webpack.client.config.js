const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require("path");

const htmlWebPackPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html'
});

const dotenv = new Dotenv()

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
        "#c" : path.resolve("src","client")
    },
    modules: [
        path.resolve("src"),
        "node_modules"
    ],
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        generator: {
          filename: "images/[name][ext][query]"
        },
        type: "asset/resource",
      },
    ]
  },
  plugins: [
      dotenv,
      htmlWebPackPlugin
    ]
};
