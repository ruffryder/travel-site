const path = require("path");
module.exports = {
  entry: "./assets/scripts/App.js",
  output: {
    path: path.resolve(__dirname, "./temp/scripts"),
    filename: "App.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
