/**************************************************
 plug-in
 *************************************************/
const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnext = require('postcss-cssnext');
const autoprefixer = require("autoprefixer");
const postcssGapProperties = require("postcss-gap-properties");
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const sitemap = require('gulp-sitemap');
const save = require('gulp-save');
const browserSync = require('browser-sync').create();

/**************************************************
 path
 *************************************************/
var paths = {
  'scss': 'src/sass/',
  'img': 'src/img/',
  'js': 'src/js/',
  'distJs': 'assets/js/',
  'distImg': 'assets/img/',
  'css': 'assets/css/'
};

/**************************************************
 browser
 *************************************************/
var AUTOPREFIXER_BROWSERS = [
  'last 2 version',
  'ie >= 11',
  'iOS >= 9',
  'Android >= 4.4'
];

/**************************************************
 scss
 *************************************************/
gulp.task("scss-dev", done => {
  var processors = [
    cssnext({
      browsers: AUTOPREFIXER_BROWSERS
    })
  ];
  // ★ style.scssファイルを監視
  return gulp.watch(paths.scss + '**/*.scss', function() {
    // style.scssの更新があった場合の処理

    // style.scssファイルを取得
    return (
      // Sassのコンパイルを実行
      gulp.src(paths.scss + '**/*.scss', { sourcemaps: true })
        .pipe(plumber({
          errorHandler: function (err) {
            console.log(err.messageFormatted);
            this.emit('end');
          }
        }))
        .on('error', function (err) {
          console.log(err.message);
        })
        .pipe(sass({
          // outputStyle: "compressed"
          outputStyle: "expanded"
          // outputStyle: "nested"
          // outputStyle: "compact"
        }))
        .pipe(postcss(processors))
        .pipe(postcss([
          postcssGapProperties(),
          autoprefixer({
            grid: true
          })
        ]))
        // cssフォルダー以下に保存
        .pipe(gulp.dest(paths.css, { sourcemaps: './maps' }))
    );
  });

  done();
});


/**************************************************
 Js
 *************************************************/
gulp.task('js-dev', done => {
  return gulp.watch(paths.js + '**/*.js', function() {
    return (
      // Jsのコンパイルを実行
      gulp.src(paths.js + '**/*.js', { sourcemaps: true })
        // .pipe(sourcemaps.init())
        //Jsファイルを圧縮
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        // jsフォルダー以下に保存
        .pipe(gulp.dest(paths.distJs, { sourcemaps: './maps' }))
    );
  });

  done();
});


/**************************************************
 image
 *************************************************/
gulp.task('img-dev', done => {
  return gulp.src(paths.img + '/*')
    .pipe(imagemin([
      pngquant({
        quality: [0.9, 0.95],
        speed: 1
      }),
      mozjpeg({ quality: 100 }),
      imagemin.svgo(),
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(paths.distImg))

  done();
});



/**************************************************
 sitemap.xmlの作成
 *************************************************/
gulp.task('sitemap', done => {
  gulp.src('!(node_modules)**/**/*.html', {
    read: false
  })
    .pipe(save('before-sitemap'))
    .pipe(sitemap({
      siteUrl: 'http://saio.dev-all.jp/sitemap-xml/markxspecial/'
    })) // Returns sitemap.xml
    .pipe(gulp.dest('./'))
    .pipe(save.restore('before-sitemap'))

  done();
});


/**************************************************
 browser-sync
 *************************************************/
// ブラウザの自動リロード
gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html',
    }
  });
  done()
})
gulp.task('watch', () => {
  const browserReload = done => {
    browserSync.reload();
    done()
  };

  gulp.watch('./**/*', browserReload)
});


/**************************************************
 taskの実行
 *************************************************/
gulp.task('default',
  gulp.series(
    gulp.parallel('scss-dev', 'js-dev', /*'img-dev', 'sitemap',*/ 'serve', 'watch'),
  )
);
