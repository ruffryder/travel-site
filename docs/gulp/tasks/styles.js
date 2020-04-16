const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssvars = require("postcss-simple-vars");
const nested = require("postcss-nested");
const cssImport = require("postcss-import");
const cssMixins = require("postcss-mixins");

gulp.task("styles", function () {
  return gulp
    .src("./assets/styles/styles.css")
    .pipe(postcss([cssImport, cssMixins, cssvars, nested, autoprefixer]))
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(gulp.dest("./temp/styles"));
});
