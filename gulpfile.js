// const gulp = require("gulp");
// const plumber = require("gulp-plumber");
// const sourcemap = require("gulp-sourcemaps");
// const less = require("gulp-less");
// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
// const csso = require("postcss-csso");
// const rename = require("gulp-rename");
// const htmlmin = require("gulp-htmlmin");
// const uglify = require("gulp-uglify");
// const imagemin = require("gulp-imagemin");
// const webp = require("gulp-webp");
// const cheerio = require('gulp-cheerio');
// const svgmin = require('gulp-svgmin');
// const replace = require('gulp-replace');
// const svgSprite = require("gulp-svg-sprite");
// const del = require("del");
// const sync = require("browser-sync").create();

// // Styles

// const styles = () => {
//     return gulp.src("source/less/style.less")
//         .pipe(plumber())
//         .pipe(sourcemap.init())
//         .pipe(less())
//         .pipe(postcss([
//             autoprefixer(),
//             csso()
//         ]))
//         .pipe(rename("style.min.css"))
//         .pipe(sourcemap.write("."))
//         .pipe(gulp.dest("build/css"))
//         .pipe(sync.stream());
// };

// exports.styles = styles;

// // HTML

// const html = () => {
//     return gulp.src("source/*.html")
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest("build"));
// };

// // // Scripts

// const scripts = () => {
//     return gulp.src("source/js/script.js")
//         .pipe(uglify())
//         .pipe(rename("script.min.js"))
//         .pipe(gulp.dest("build/js"))
//         .pipe(sync.stream());
// };

// exports.scripts = scripts;

// // Images

// const images = () => {
//     return gulp.src("source/img/**/*.{jpg,png,svg}")
//         .pipe(imagemin([
//             imagemin.optipng({ optimizationLevel: 3 }),
//             imagemin.mozjpeg({ progressive: true }),
//             imagemin.svgo()
//         ]))

//         .pipe(gulp.dest("build/img"));
// };

// exports.images = images;

// // WebP

// const createWebp = () => {
//     return gulp.src("source/img/**/*.{jpg,png}")
//         .pipe(webp({ quality: 90 }))
//         .pipe(gulp.dest("build/img"));
// };

// exports.createWebp = createWebp;

// // // Sprite


// const sprite = () => {
//     return gulp.src("source/img/**/*.svg")

//         .pipe(svgmin({
//             js2svg: {
//                 pretty: true
//             }
//         }))

//         .pipe(cheerio({
//             run: function ($) {
//                 $('[fill]').removeAttr('fill');
//                 $('[stroke]').removeAttr('stroke');
//                 $('[style]').removeAttr('style');
//             },
//             parserOptions: { xmlMode: true }
//         }))
//         // cheerio plugin create unnecessary string '&gt;', so replace it.
//         .pipe(replace('&gt;', '>'))
//         .pipe(svgSprite({
//             mode: {
//                 stack: {
//                     sprite: "../sprite.svg",
//                     example: true,
//                     symbol: true
//                 }
//             },
//         }))
//         .pipe(gulp.dest("source/img"));
// };

// exports.sprite = sprite;



// // Copy



// function copy(done) {
//     gulp.src([
//         "source/fonts/*.{woff2,woff}",
//         "source/*.ico",
//         "source/img/**/*.{jpg,png,svg}",
//     ], {
//         base: "source"
//     })
//         .pipe(gulp.dest("build"));
//     done();
// }

// exports.copy = copy;

// // Clean

// const clean = () => {
//     return del("build");
// };

// // Server

// const server = (done) => {
//     sync.init({
//         server: {
//             baseDir: "build"
//         },
//         cors: true,
//         notify: false,
//         ui: false,
//     });
//     done();
// };

// exports.server = server;

// // Reload

// const reload = done => {
//     sync.reload();
//     done();
// };

// // Watcher

// const watcher = () => {
//     gulp.watch("source/less/**/*.less", gulp.series(styles));
//     gulp.watch("source/*.html", gulp.series(html, reload));
// };

// // Build

// const build = gulp.series(
//     clean,
//     gulp.parallel(
//         styles,
//         html,
//         copy,
//         images,
//         createWebp
//     ));

// exports.build = build;

// // Default

// exports.default = gulp.series(
//     clean,
//     gulp.parallel(
//         styles,
//         html,
//         copy,
//         createWebp
//     ),
//     gulp.series(
//         server,
//         watcher
//     ));



// // *************************************************************** first

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
    return gulp.src("source/less/style.less")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("source/css"))
        .pipe(sync.stream());
};

exports.styles = styles;




// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: 'source'
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
};

exports.server = server;

// Watcher

const watcher = () => {
    gulp.watch("source/less/**/*.less", gulp.series("styles"));
    gulp.watch("source/*.html").on("change", sync.reload);
};

exports.default = gulp.series(
    styles, server, watcher
);