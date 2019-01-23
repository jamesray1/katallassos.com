var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    clean           = require('gulp-clean'),
    cleanCss        = require('gulp-clean-css'),
    sourcemaps      = require('gulp-sourcemaps'),
    runSequence     = require('run-sequence');


//ionicons
gulp.task('ioniconsFont', function(){
    return gulp.src('node_modules/ionicons/dist/fonts/*')
        .pipe(gulp.dest("dist/fonts/"));
})

gulp.task('ioniconsCss', function(){
    return gulp.src('node_modules/ionicons/dist/scss/ionicons.scss')
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"));
})

//flaticon
gulp.task('flaticonFont', function(){
    return gulp.src('src/font/*')
        .pipe(gulp.dest("dist/fonts/"));
})

gulp.task('flaticonCss', function(){
    return gulp.src(['src/scss/vendor/flaticon.scss', 'src/scss/vendor/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"));
})

//image
gulp.task('image', function(){
    return gulp.src(['src/img/*.png', 'src/scss/vendor/*.jpg'])
        .pipe(gulp.dest("dist/img/"));
})


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

//compile style task
gulp.task('mainSass', function() {
    return gulp.src(['src/scss/style.scss', 'src/scss/*.scss'])
        .pipe(sass())
});

//compile page style task
gulp.task('pageSass', function() {
    return gulp.src(['src/scss/page.scss'])
        .pipe(sass())
        .pipe(gulp.dest("dist/css"));
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['src/js/*.js','node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.js'])
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'mainSass', 'pageSass'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss', 'src/scss/*/**.scss'], ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js','serve']);

//clean dist folder
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean'], function () {
  runSequence(
    'ioniconsFont',
    'ioniconsCss',
    'flaticonFont',
    'flaticonCss',
    'image',
    'sass',
    'mainSass',
    'pageSass',
    'js'
  );
});

// var gulp = require('gulp');
// var csso = require('gulp-csso');
 
// gulp.task('default', function () {
//     return gulp.src('./main.css')
//         .pipe(csso())
//         .pipe(gulp.dest('./out'));
// });
 
// gulp.task('development', function () {
//     return gulp.src('./main.css')
//         .pipe(csso({
//             restructure: false,
//             sourceMap: true,
//             debug: true
//         }))
//         .pipe(gulp.dest('./out'));
// });