const path = require("path");
module.exports = {
  entry: {
    App: "./assets/scripts/App.js",
    Vendor: "./assets/scripts/Vendor.js",
  },
  output: {
    path: path.resolve(__dirname, "./temp/scripts"),
    filename: "[name].js",
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
