const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const cache = require('gulp-cache');
const browserSync = require('browser-sync');
// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// var browserify = require('gulp-browserify');

gulp.task('clean', () => {
    return del.sync('dist');
});

gulp.task('clear', () => {
    return cache.clearAll();
});

gulp.task('libsjs', () => {
    return gulp.src([
            'app/libs/jquery/dist/jquery.min.js',
            'app/libs/bootstrap/dist/js/bootstrap.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', () => {
    // del.sync('dist/js');
    return gulp.src('app/js/**/*.jsx')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(rename((path) => {
            path.extname = ".js"
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('viewjsx', () => {
    return gulp.src('app/view/**/*.jsx')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(rename((path) => {
            path.extname = ".js"
        }))
        .pipe(gulp.dest('dist/view'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: true,
        notyfi: false
    });
});

gulp.task('html', () => {
  browserSync.reload({
      stream: true
  });
});

// gulp.task('browserify', function() {
//     return browserify('./app/js/appchat.js')
//         .bundle()
//         // Передаем имя файла, который получим на выходе, vinyl-source-stream
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest('./app/js'));
// });

// gulp.task('browserify',['scripts'], function() {
//     // Single entry point to browserify
//     gulp.src('app/dist/js/appchat.js')
//         .pipe(browserify({
//           insertGlobals : true,
//           debug : !gulp.env.production
//         }))
//         .pipe(rename ((path) =>{
//             path.basename = "app";
//         }))
//         .pipe(gulp.dest('./app/js/'))
// });

// gulp.task('watch', ['browser-sync', 'sass', 'viewjsx', 'libsjs', 'scripts'], () => {
gulp.task('watch', ['browser-sync', 'scripts'], () => {
    // gulp.watch('app/view/**/*.jsx', ['viewjsx']);
    // gulp.watch('app/sass/**/*.sass', ['sass']);
    // gulp.watch('app/js/**/*.jsx').on('change', browserSync.reload);
    gulp.watch('app/js/**/*.jsx', ['scripts']);
    // gulp.watch('*.html').on('change', browserSync.reload);
});
