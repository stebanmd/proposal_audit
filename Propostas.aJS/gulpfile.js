var gulp = require('gulp'),
	rename = require('gulp-rename'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	nib = require('nib'),
	ngAnnotate = require('gulp-ng-annotate'),
	del = require('del'),
	spritesmith = require('gulp.spritesmith'),
	modernizr = require('gulp-modernizr'),
	imagemin = require('gulp-imagemin'),
  	browserSync = require('browser-sync'),
  	reload = browserSync.reload,
  	runSequence = require('run-sequence'),
  	stylint = require('gulp-stylint'),
	watch = require('gulp-watch'),
	mainBowerFiles = require('gulp-main-bower-files');

var config = {
	dest: 'Deploy',
	src: 'Frontend/',
	html: 'Frontend/**/**/*.html',
	bowerfiles: 'bower_components',
	scriptsConfig: 'Frontend/config/*.js',
	scriptsModule:'Frontend/application/**/**/**/**/**/*.module.js',
	scriptsDataService:'Frontend/application/**/**/**/**/**/*.dataService.js',
	scriptsProvider:'Frontend/application/**/**/**/**/**/*.provider.js',
	scriptsController:'Frontend/application/**/**/**/**/**/*.controller.js',
	scriptsStates:'Frontend/application/**/**/**/**/**/*.states.js',
	scriptsService:'Frontend/application/**/**/**/**/**/*.service.js',
	scriptsApplication:'Frontend/application/**/**/**/**/**/*.js',
	scriptsProviders:'Frontend/providers/**/**/**/**/**/*.js',
	styles:'Frontend/assets/styl/**/**/**/**/*.styl',
	pluginsAngular:'Frontend/assets/plugins/**/**/angular.js',
	pluginsSpinJs:'Frontend/assets/plugins/**/**/spin.js',
	pluginsJQuery:'Frontend/assets/plugins/**/**/jquery.js',
	pluginsBower:'Frontend/assets/plugins/bower/**/**/**/*.js',	
	plugins:'Frontend/assets/plugins/**/**/**/*.js',
	fonts:'Frontend/assets/fonts/**/*',
	images:'Frontend/assets/img/**/**/*',
	imagesSrc: 'Frontend/assets/img/',
	sprites: 'Frontend/assets/img/sprite-src/**/*.png',
	spriteStylus: 'Frontend/assets/styl/',
	sprites2x: 'Frontend/assets/img/sprite-src/**/*-2x.png'
};

gulp.task('clean', function () {
	return del([config.dest]);
});

gulp.task('scriptsConfig', function() {
  return gulp.src([config.scriptsConfig])
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(concat('config.js'))
  .pipe(sourcemaps.write('../sourcemaps'))
  .pipe(gulp.dest(config.dest + '/Content/js'));
});

gulp.task('stylus-lint', function () {
  return gulp.src([config.styles, '!Frontend/assets/styl/sprite.styl','!Frontend/assets/styl/2-fonts.styl','!Frontend/assets/styl/0-boilerplate.styl','!Frontend/assets/styl/1-bootstrap.styl'])
	.pipe(stylint({
	      rules: {
					"blocks": false,
					"brackets": {
						"expected": "never",
						"error":true
					},
					"colors":  false,
					"colons": {
						"expected": "never",
						"error":true
					},
					"commaSpace": "always",
					"commentSpace": "always",
					"cssLiteral": "never",
					"depthLimit": false,
					"duplicates": {
						"expected": true,
						"error":true
					},
					"efficient": {
						"expected": "always",
						"error":true
					},
					"globalDupe": true,
					"indentPref": false,
					"leadingZero": "never",
					"maxErrors": false,
					"maxWarnings": false,
					"mixed": false,
					"namingConvention": "lowercase-dash",
					"namingConventionStrict": true,
					"none": {
						"expected": "never",
						"error":true
					},
					"noImportant": {
						"expected": true,
						"error":true
					},
					"parenSpace": "always",
					"placeholders": "always",
					"prefixVarsWithDollar": "always",
					"quotePref": "single",
					"semicolons": {
						"expected": "never",
						"error":true
					},
					"sortOrder": false,
					"stackedProperties": "never",
					"trailingWhitespace": false,
					"universal": false,
					"valid": {
						"expected": true,
						"error":true
					},
					"zeroUnits": {
						"expected": "never",
						"error":true
					},
					"zIndexNormalize": false
	      },
        reporter: 'stylint-stylish',
        reporterOptions: {
          verbose: true
        }
    	}
      ))
  .pipe(stylint.reporter());
});



gulp.task('plugins', function() {
  return gulp.src([config.pluginsAngular, config.pluginsSpinJs, config.pluginsJQuery, config.pluginsBower, config.plugins])
  .pipe(sourcemaps.init())
  .pipe(concat('plugins.min.js'))
  .pipe(sourcemaps.write('../sourcemaps'))
  .pipe(gulp.dest(config.dest + '/Content/js'));
});

gulp.task('plugins-build', function() {
  return gulp.src([config.pluginsAngular, config.pluginsSpinJs, config.pluginsJQuery, config.pluginsBower, config.plugins])
  .pipe(concat('plugins.min.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest(config.dest + '/Content/js'));
});

gulp.task('scripts', function() {
  return gulp.src([config.scriptsModule, config.scriptsDataService, config.scriptsProvider, config.scriptsController, config.scriptsStates, config.scriptsService, config.scriptsApplication, config.scriptsProviders])
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(concat('app.min.js'))
  .pipe(sourcemaps.write('../sourcemaps'))
  .pipe(gulp.dest(config.dest + '/Content/js'));
});

gulp.task('scripts-build', function() {
  return gulp.src([config.scriptsModule, config.scriptsDataService, config.scriptsProvider, config.scriptsController, config.scriptsStates, config.scriptsService, config.scriptsApplication, config.scriptsProviders])
  .pipe(jshint())
  .pipe(concat('app.min.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest(config.dest + '/Content/js'));
});

gulp.task('styles',['stylus-lint'], function () {
  return gulp.src([config.styles])
  .pipe(sourcemaps.init())
  .pipe(stylus({use: [nib()]}))
  .pipe(concat('style.min.css'))
  .pipe(sourcemaps.write('../sourcemaps'))
  .pipe(gulp.dest(config.dest + '/Content/css'))
  .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task('styles-build', function () {
  return gulp.src([config.styles])
  .pipe(stylus({use: [nib()]}))
  .pipe(concat('style.min.css'))
  .pipe(cleanCSS({keepBreaks:false, compatibility: 'ie8'}))
  .pipe(gulp.dest(config.dest + '/Content/css'))
  .pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task('modernizr', function() {
	gulp.src([config.scriptsModule])
	.pipe(modernizr())
    .pipe(gulp.dest(config.dest + '/Content/js'));
});

gulp.task('fonts', function() {
 return gulp.src(config.fonts)
  .pipe(gulp.dest(config.dest + '/Content/fonts'));
});

gulp.task('imgs', function() {
  return gulp.src([config.images, '!' + config.sprites])
  .pipe(gulp.dest(config.dest + '/Content/img'));
});

gulp.task('imgs-build', function() {
  return gulp.src([config.images, '!' + config.sprites])
  .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
  .pipe(gulp.dest(config.dest + '/Content/img'));
});

gulp.task('sprite', function () {
  return gulp.src(config.sprites)
  .pipe(spritesmith({
    imgName: '../img/sprite.png',
    imgPath: '../img/sprite.png',
    cssName: 'sprite.styl',
    cssFormat: 'css'
  }))
  .pipe(gulp.dest(config.spriteStylus));
});

gulp.task('bower-files', function() {
  return gulp.src('./bower.json')
      .pipe(mainBowerFiles())
      .pipe(gulp.dest(config.src + '/assets/plugins/bower'));
});

gulp.task('copy-html', function() {
  return gulp.src(config.html)
      .pipe(gulp.dest(config.dest));
});

// server
gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir: config.dest,
			directory: true,
			https: false
		},
		notify: true,
		logPrefix: 'Frontend'
	});

	watch([config.styles], function(){
		runSequence(['styles']);
	});

	watch([config.scriptsApplication, config.scriptsProviders], function(){
		runSequence(['scripts'], function () {
			reload();
		});
	});
	
	watch([config.scriptsConfig], function(){
		runSequence(['scriptsConfig'], function () {
			reload();
		});
	});

	watch(config.bowerfiles, function(){
		runSequence(['bower-files']);
	});

	watch(config.plugins, function(){
		runSequence(['plugins'], function () {
			reload();
		});
	});

	watch(config.images, function(){
		runSequence(['imgs'], function () {
			reload();
		});
	});

	watch(config.sprites, function(){
		runSequence(['sprite']);
	});
	
	watch(config.fonts, function(){
		runSequence(['fonts'], function () {
			reload();
		});
	});
	
	watch(config.html, function(){
		runSequence(['copy-html'], function () {
			reload();
		});
	});

});

// default build task
gulp.task('default', ['clean'], function () {

	// define build tasks
	var tasks = [
		'modernizr',
		'scripts',
		'scriptsConfig',
		'styles',
		'bower-files',
		'plugins',
		'fonts',
		'sprite',
		'imgs',
		'copy-html'
	];

	// run build
	runSequence(tasks, function () {
		gulp.start('serve');
	});

});

gulp.task('build', function(){
// define build tasks
	var tasks = [
		'modernizr',
		'scripts-build',
		'scriptsConfig',
		'styles-build',
		'bower-files',
		'plugins-build',
		'fonts',
		'sprite',
		'imgs-build',
		'copy-html'
	];

	// run build
	runSequence(tasks, function () {
		gulp.start('serve');
	});
});
