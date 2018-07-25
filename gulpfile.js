var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del');
var cache = require('gulp-cache');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var notify = require("gulp-notify");
var sass  = require('gulp-sass');
var rename = require("gulp-rename");



var path = {
    src: {
        html: 'app/*.html',
        js: 'app/js/app.js',
        css: 'app/sass/**/*.sass',
        img: 'app/images/**/*.*',
        fonts: 'app/fonts/**/*.*'
    }
}

gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('styles', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

gulp.task('img', function () {
    return gulp.src('app/images/**/*.*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        'app/js/coreSlider.js',
        'app/js/jquery.arcticmodal-0.3.min.js',
        'app/js/app.js'
        
    ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});


gulp.task('watch', ['browser-sync', 'styles', 'scripts'], function () {
    gulp.watch(path.src.css, ['styles']);
    gulp.watch(path.src.js, ['scripts']);
    gulp.watch('app/*.html', browserSync.reload);

});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('build', ['clean', 'styles', 'scripts', 'img'], function () {

    var buildCss = gulp.src('app/css/styles.min.css')

        .pipe(gulp.dest('dist/css'));

   
    var buildJs = gulp.src('app/js/scripts.min.js')
        
        .pipe(gulp.dest('dist/js'));

    var buildFonts = gulp.src('app/fonts/**/*.*')

        .pipe(gulp.dest('dist/fonts'));

    var buildImages = gulp.src('app/images/**/*.*')

        .pipe(gulp.dest('dist/images'));

    var favImages = gulp.src('app/*.ico')

        .pipe(gulp.dest('dist/'));


});


gulp.task('clear', function () {
    return cache.clearAll();
});



gulp.task('default', ['watch']);