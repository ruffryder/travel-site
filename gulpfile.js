const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssvars = require("postcss-simple-vars");
const nested = require("postcss-nested");

gulp.task("default", function () {
  console.log("Hooray - task created");
});

gulp.task("html", function () {
  console.log("something useful happened");
});

gulp.task("styles", function () {
  return gulp
    .src("./assets/styles/styles.css")
    .pipe(postcss([cssvars, nested, autoprefixer]))
    .pipe(gulp.dest("./temp/styles"));
});

gulp.task("watch", function () {
  gulp.watch("./**/*.html", gulp.series("html"));
  gulp.watch("./assets/styles/**/*.css", gulp.series("styles"));
});
