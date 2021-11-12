const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const csso = require("gulp-csso");
const browserSync = require("browser-sync").create(); //optional

function style() {
	return gulp
		.src("./app/scss/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./app/css"))
		.pipe(browserSync.stream());
}

gulp.task("default", function () {
	return gulp.src("./css/main.css").pipe(csso()).pipe(gulp.dest("./dist"));
});

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
			// proxy: "http://localhost:3000/", LÄS PÅ OM PROXY .dev
		},
	});
	gulp.watch("./scss/**/*.scss", style);
	gulp.watch("./*html").on("change", browserSync.reload);
	gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
