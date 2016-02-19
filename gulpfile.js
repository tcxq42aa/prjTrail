var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var spriter = require('gulp-css-spriter');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var generate = require('./readFile');

var timestamp = new Date().getTime();

gulp.task('clean', function(){
    return gulp.src(['public/dest/images/*.*', 'public/dest/stylesheets/*.css', 'public/dest/javascripts/*.js', 'public/dest/html/*.html'])
        .pipe(clean());
});

gulp.task('css', function(){
    return gulp.src('public/stylesheets/**.css')
        //.pipe(spriter({
        // The path and file name of where we will save the sprite sheet
        //'spriteSheet': 'public/images/spritesheet.png',
        // Because we don't know where you will end up saving the CSS file at this point in the pipe,
        // we need a litle help identifying where it will be.
        //'pathToSpriteSheetFromCSS': 'public/images/spritesheet.png'
        //}))
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(concat('all_' + timestamp + '.css'))
        .pipe(gulp.dest('public/dest/stylesheets'));
});

gulp.task('js:lib', function(){
    return gulp.src('public/javascripts/jquery.js')
        .pipe(uglify('jquery.min.js'))
        .pipe(gulp.dest('public/dest/javascripts'));
});
gulp.task('js', function(){
    return gulp.src(['public/javascripts/app.js', 'public/javascripts/native.js'])
        .pipe(concat('all_' + timestamp + '.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dest/javascripts'));
});

gulp.task('img', function(){
    return gulp.src('public/images/**.*')
        .pipe(gulp.dest('public/dest/images'));
});

gulp.task('html', function(){
    gulp.src('public/404.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('public/dest'));
    return gulp.src('views/index2.ejs')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('views/build'));
});

gulp.task('generate',['css', 'js:lib', 'js', 'img', 'html'],  function () {
    generate(timestamp);
});

gulp.task('default',['generate'],  function () {
    return;
});