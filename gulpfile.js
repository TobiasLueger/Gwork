const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const server = browserSync.create();

const paths = {
	scripts: {
		js_main: './js/*.js',
		js_partials: './js/partials/*.js',
		js_docs:'./public/js/*.js'
	},

	styles: {
		scss_main: './scss/*.scss',
		scss_partials: './scss/partials/*.scss',
		css_docs:'./public/css/*.css'
	},

	img: {
		img_main: './img/**/*',
	},

	templates: {
		html: './*.html'
	},

	expo: {
		dest_css: 'public/css/',
		dest_js: 'public/js/',
		dest_img: 'public/img/',
		dest:'public/',
		docs_css: 'docs/css/',
		docs_js: 'docs/js/',
		docs_img: 'docs/img/',
		docs: 'docs/',
		pub: 'public/',
	},
};


/**
 *
 *
 * Overall Tasks
 *
 * **/


const cleanAll = () => del(['docs', 'public']);
const cleanDocs = () => del(['docs']);
const cleanPublic = () => del(['public']);



/**
 *
 *
 * Default Task
 *
 * **/

function copyHtmlPub() {
	return gulp.src(paths.templates.html, { sourcemaps: true })
		.pipe(gulp.dest(paths.expo.pub));
}

function styles() {
	return gulp.src(paths.styles.scss_main, { sourcemaps: true })
		.pipe(sass())
		.pipe(gulp.dest(paths.expo.dest_css));
}

function scripts() {
	return gulp.src(paths.scripts.js_main, { sourcemaps: true })
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest(paths.expo.dest_js));
}

function copyImgPub() {
	return gulp.src(paths.img.img_main, { sourcemaps: true })
		.pipe(gulp.dest(paths.expo.dest_img));
}

function reload(done) {
	server.reload();
	done();
}

function serve(done) {
	server.init({
		server: {
			baseDir: './public/'
		}
	});
	done();
}

const watch = () => {
	gulp.watch([ paths.scripts.js_main,
		paths.scripts.js_partials,
		paths.styles.scss_main,
		paths.styles.scss_partials,
		paths.templates.html,
		paths.img.img_main],

		gulp.series(copyHtmlPub, styles, scripts, copyImgPub, reload))
};
/**
 *
 *
 * Build Task
 *
 * **/


function buildDirectory() {
	return gulp.src('*.*', {read: false})
		.pipe(gulp.dest('./docs/css'))
		.pipe(gulp.dest('./docs/js'))
		.pipe(gulp.dest('./docs/img'));
}

function copyHtmlDocs() {
	return gulp.src(paths.templates.html, { sourcemaps: true })
		.pipe(gulp.dest(paths.expo.docs));
}

function copyJs() {
	return gulp.src(paths.scripts.js_main, { sourcemaps: true })
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(paths.expo.docs_js));
}

function copyCss() {
	return gulp.src(paths.styles.scss_main, { sourcemaps: true })
		.pipe(sass())
		.pipe(uglifycss({
			"maxLineLen": 80,
			"uglyComments": true
		}))
		.pipe(gulp.dest(paths.expo.docs_css));
}

function copyImgDocs() {
	return gulp.src(paths.img.img_main, { sourcemaps: true })
		.pipe(gulp.dest(paths.expo.docs_img));
}



/**
 *
 *
 * Start Tasks
 *
 * **/

gulp.task('default', gulp.series(copyHtmlPub, scripts, styles, copyImgPub, serve, watch),);


gulp.task('build', gulp.series(cleanDocs, copyHtmlDocs, buildDirectory, copyJs, copyCss, copyImgDocs),);

gulp.task('deleteAll', gulp.series(cleanAll),);
gulp.task('deleteDocs', gulp.series(cleanDocs),);
gulp.task('deletePublic', gulp.series(cleanPublic),);



