const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require("path");

const htmlWebPackPlugin = new HtmlWebPackPlugin({
  template: './src/client/index.html',
  filename: './index.html'
});

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  resolve: {
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
    ]
  },
  plugins: [htmlWebPackPlugin]
};
