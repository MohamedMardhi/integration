var gulp = require('gulp'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    cache = require('gulp-cached'),
    cssnano = require('gulp-cssnano'),
    debug = require('gulp-debug');

// copy files from dir Project to dir Dist
// run with "gulp copy"
// gulp.src accept an object

// TO ADD
// gulp-if & gulp-filter &


// html task
gulp.task('html', function () {
    return gulp.src('project/index.html')
        //.pipe(pugjs({ pretty: true }))
        .pipe(gulp.dest('dist/'))
        //.pipe(notify('le projet est pret'))
        .pipe(livereload());
});
// compile sass files
// autoprefix css propreties
// Task css concatenate all files and give only style.css
// 
gulp.task('css', function () {
    return gulp.src('project/css/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        //.pipe(notify('le projet est pret'))
        .pipe(livereload());
});
// Task js concatenate all files and give only script.js
gulp.task('js', function () {
    return gulp.src('project/js/*.js')
        .pipe(debug({ title: 'file Debug:' }))
        .pipe(cache('linting'))
        //.pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(uglify())
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        //.pipe(notify('le projet est pret'))
        .pipe(livereload());
});


// watch all tasks => gulp watch
gulp.task('watch', function () {
    require('./server.js');
    livereload.listen();
    gulp.watch('project/index.html', gulp.series('html'));
    gulp.watch('project/css/**/*.scss', gulp.series('css'));
    gulp.watch('project/js/*.js', gulp.series('js'));
    return
});