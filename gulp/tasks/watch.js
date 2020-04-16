const gulp = require("gulp");
const browserSync = require("browser-sync").create();

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  gulp.watch("./**/*.html", function () {
    browserSync.reload();
  });
  gulp.watch("./assets/styles/**/*.css", gulp.series("styles", "cssInject"));
  gulp.watch(
    "./assets/scripts/**/*.js",
    gulp.series("modernizr", "scripts", "scriptsRefresh")
  );
});

gulp.task("scriptsRefresh", function () {
  browserSync.reload();
});

gulp.task("cssInject", function () {
  return gulp.src("./assets/styles/styles.css").pipe(browserSync.stream());
});
