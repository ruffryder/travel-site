const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const del = require("del");
const usemin = require("gulp-usemin");
const rev = require("gulp-rev");
const nano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

gulp.task("previewDist", function () {
  browserSync.init({
    server: {
      baseDir: "docs",
    },
  });
});

gulp.task("deleteDistFolder", function () {
  return del("./docs");
});

gulp.task("copyGeneralFiles", function () {
  let pathsToCopy = [
    "./**/*",
    "!./index.html",
    "!./assets/images/**",
    "!./assets/styles/**",
    "!./assets/scripts/**",
    "!./temp",
    "!./temp/**",
    "!./node_modules",
    "!./node_modules/**",
    "./.gitignore",
    "./gulpfile.js",
    "./debug.log",
    "./package.json",
    "./package-lock.json",
    "./webpack.config.js",
  ];
  return gulp.src(pathsToCopy).pipe(gulp.dest("./docs"));
});

gulp.task("optimizeImages", function () {
  return gulp
    .src([
      "./assets/images/**/*",
      "!./assets/images/icons",
      "!./assets/images/icons/**/*",
    ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true,
      })
    )
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("usemin", function () {
  return gulp
    .src("./index.html")
    .pipe(
      usemin({
        css: [
          function () {
            return rev();
          },
          function () {
            return nano();
          },
        ],
        js: [
          function () {
            return rev();
          },
          function () {
            return uglify();
          },
        ],
      })
    )
    .pipe(gulp.dest("./docs"));
});

gulp.task(
  "build",
  gulp.series(
    "deleteDistFolder",
    "copyGeneralFiles",
    "icons",
    "optimizeImages",
    "styles",
    "scripts",
    "usemin"
  )
);
