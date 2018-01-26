/* eslint-env node, es6 */
'use strict';

const NODE_MODULE_PATH = `node_modules`;

// Sources
const SRCBASE          = `source`;
const SRCIMAGES        = `${SRCBASE}/images`;
const SRCJAVASCRIPTS   = `${SRCBASE}/javascript`;
const SRCSASS          = `${SRCBASE}/scss`;

// Dist
const DSTBASE          = `www`;
const DSTIMAGES        = `${DSTBASE}/images`;
const DSTJAVASCRIPTS   = `${DSTBASE}/js`;
const DSTSTYLES        = `${DSTBASE}/css`;
const DSTFONTS         = `${DSTBASE}/fonts`;

// Modules
const gulp             = require('gulp');
const changed          = require('gulp-changed');
const imagemin         = require('gulp-imagemin');
const pngquant         = require('imagemin-pngquant');
const concat           = require('gulp-concat');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const sass             = require('gulp-sass');
const minifycss        = require('gulp-cssnano');

// Configs
const jsEntries = [
    `${SRCJAVASCRIPTS}/init.js`
];

const minifyCssConfig = {
    safe: true,
    zindex: false,
    discardComments: {
        removeAll: true
    },
    autoprefixer: {
        add: true,
        browsers: [
            'Edge >= 12',
            'Chrome >= 50',
            'ChromeAndroid >= 50',
            'Firefox 53',
            'Safari >= 10.1',
            'ie >= 10',
            'iOS >= 10.3'
        ]
    }
};

const imageminConfig = {
    progressive: true,
    svgoPlugins: [{
        removeViewBox: false
    }],
    use: [pngquant()]
};

const sourcemapsInitConfig = {
    loadMaps: true
}

const sourcemapsWriteConfig = {
    includeContent: false
}

const sassConfig = {
    style: 'expanded',
    errLogToConsole: true
}

// Tasks
gulp.task('build-html', () => {
    return gulp.src(`${SRCBASE}/*.html`)
        .pipe(gulp.dest(DSTBASE));
});

gulp.task('build-img', () => {
    return gulp.src(`${SRCIMAGES}/**/*`)
        .pipe(changed(DSTIMAGES))
        .pipe(imagemin(imageminConfig))
        .pipe(gulp.dest(DSTIMAGES));
});

gulp.task('build-js', () => {
    return gulp.src(jsEntries)
        .pipe(sourcemaps.init(sourcemapsInitConfig))
        .pipe(concat('main.build.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./', sourcemapsWriteConfig))
        .pipe(gulp.dest(DSTJAVASCRIPTS))
});

gulp.task('build-scss', () => {
    return gulp.src(`${SRCSASS}/**/*.scss`)
        .pipe(sourcemaps.init(sourcemapsInitConfig))
        .pipe(sass(sassConfig).on('error', sass.logError))
        .pipe(minifycss(minifyCssConfig))
        .pipe(sourcemaps.write('./', sourcemapsWriteConfig))
        .pipe(gulp.dest(DSTSTYLES));
});

gulp.task('build-fonts', () => {
    return gulp.src(`${NODE_MODULE_PATH}/font-awesome/fonts/**/*`)
        .pipe(gulp.dest(DSTFONTS));
});

gulp.task('build-all', [
    'build-html',
    'build-scss',
    'build-img',
    'build-fonts',
    'build-js'
]);

gulp.task('watch', function() {
    gulp.watch(`${SRCBASE}/*.html`,      ['build-html']);
    gulp.watch(`${SRCSASS}/**/*.scss`,   ['build-scss']);
    gulp.watch(`${SRCIMAGES}/**/*`,      ['build-img']);
    gulp.watch(`${SRCJAVASCRIPTS}/**/*`, ['build-js']);
});

gulp.task('default', ['watch']);
