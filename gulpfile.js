'use strict'

var gulp = require('gulp')
var browserify = require('browserify')
var babel = require('babelify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var gutil = require('gulp-util')
var assign = require('object-assign')
var watchify = require('watchify')

gulp.task('build', ['html', 'css', 'browser-js'])
gulp.task('default', ['html', 'css'], function() {
	gulp.watch(['src/css/**/*.css'], ['css'])
	gulp.watch(['src/**/*.html'], ['html'])
	watchBrowserJsTask()
})

//
// browser-js
//
gulp.task('browser-js', ['clean:js'], function() {
	var b = browserify({
		entries: './src/index.js',
		debug: true,
		transform: [babel]
	})

	return b.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist'))
})

//
// Watch browser javascript task
//
function watchBrowserJsTask() {
	var browserifyOpts = {
		entries: ['./src/index.js'],
		debug: true
	}
	var opts = assign({}, watchify.args, browserifyOpts)
	var w = watchify(browserify(opts)).transform(babel)
	w.on('update', bundle)
	w.on('log', gutil.log)

	function bundle() {
		return w.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source('bundle.js'))
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./dist'))
	}

	return bundle()
}

//
// clean tasks
//
var clean = require('gulp-clean')
gulp.task('clean:html', function() {
	return gulp.src('./dist/**/*.html', {read: false})
		.pipe(clean())
})

gulp.task('clean:css', function() {
	return gulp.src('./dist/**/*.css', {read: false})
		.pipe(clean())
})

gulp.task('clean:js', function() {
	return gulp.src(['./dist/**/*.js', './dist/**/*.map'], {read: false})
		.pipe(clean())
})

//
// Copy html
//
gulp.task('html', ['clean:html'], function() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'))
})

//
// Copy css
//
gulp.task('css', ['clean:css'],function() {
	return gulp.src('./src/css/*.css')
		.pipe(gulp.dest('./dist/css'))
})
