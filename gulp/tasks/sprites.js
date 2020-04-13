const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const rename = require("gulp-rename");
const del = require("del");

let config = {
  mode: {
    css: {
      sprite: "sprite.svg",
      render: {
        css: {
          template: "./gulp/templates/sprite.css",
        },
      },
    },
  },
};

gulp.task("beginClean", function () {
  return del(["./temp/sprite", "./assets/images/sprites"]);
});

gulp.task("createSprite", function () {
  return gulp
    .src("./assets/images/icons/**/*.svg")
    .pipe(svgSprite(config))
    .pipe(gulp.dest("./temp/sprite/"));
});

gulp.task("copySpriteGraphic", function () {
  return gulp
    .src("./temp/sprite/css/**/*.svg")
    .pipe(gulp.dest("./assets/images/sprites"));
});

gulp.task("copySpriteCSS", function () {
  return gulp
    .src("./temp/sprite/css/*.css")
    .pipe(rename("_sprite.css"))
    .pipe(gulp.dest("./assets/styles/modules"));
});

gulp.task("endClean", function () {
  return del(["./temp/sprite"]);
});

gulp.task(
  "icons",
  gulp.series(
    "beginClean",
    "createSprite",
    "copySpriteGraphic",
    "copySpriteCSS",
    "endClean"
  )
);
