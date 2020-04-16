const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const rename = require("gulp-rename");
const del = require("del");
const svg2png = require("gulp-svg2png");

let config = {
  shape: {
    spacing: {
      padding: 1,
    },
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function () {
          return function (sprite, render) {
            return render(sprite).split(".svg").join(".png");
          };
        },
      },
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

gulp.task("createPngCopy", function () {
  return gulp
    .src("./temp/sprite/css/*.svg")
    .pipe(svg2png())
    .pipe(gulp.dest("./temp/sprite/css"));
});

gulp.task("copySpriteGraphic", function () {
  return gulp
    .src("./temp/sprite/css/**/*.{svg,png}")
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
    "createPngCopy",
    "copySpriteGraphic",
    "copySpriteCSS",
    "endClean"
  )
);
