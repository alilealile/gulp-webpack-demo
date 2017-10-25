let gulp = require('gulp'),
    
    stylus = require('gulp-stylus'), 
    autoprefixer =require('gulp-autoprefixer'),//浏览器前缀自动补全
    cssmin=  require('gulp-clean-css'), //css压缩
    
    htmlmin = require('gulp-htmlmin'),//html压缩
    
    fileinclude = require('gulp-file-include'),//模板合用
    uglify = require('gulp-uglify'),//js压缩
    
    imagemin = require('gulp-imagemin'),// img压缩
    
    notify = require('gulp-notify'),
    
    watch = require("gulp-watch"),
    clean = require("gulp-clean"),

    webpack = require('webpack-stream');


// stylus 编译
gulp.task('stylus',function(){
 return gulp.src('app/stylus/**/*.styl')
 .pipe(stylus())
 .pipe(autoprefixer({
    browsers: ['last 2 versions', 'Android >= 4.0'],
    cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
    remove:true //是否去掉不必要的前缀 默认：true
 }))
 .pipe(gulp.dest('public/css'))
 /*.pipe(cssmin())
 .pipe(gulp.dest('dist/public/css'))*/
 .pipe(notify({ message: 'Styles task complete' }));
});


//html
gulp.task('html', function () {
    return gulp.src('app/view/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('view'))
        /*.pipe(htmlmin({           
            removeComments: true,//清除HTML注释
            collapseWhitespace: false,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked=`true`/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id=`` /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type=`text/javascript`
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type=`text/css`
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest('dist/view'))*/
        ;
});


gulp.task('script',function(){   
    return gulp.src('app/js/*.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest("public/js")); 
});


gulp.task("clean",function(){
    return gulp.src(['public/css','public/js','view'], {read: false})
    .pipe(clean());
})


gulp.task('bulid', ['clean'], function() {
  gulp.start('stylus', 'script', 'html');
});




let nodemon = require('nodemon'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//启动服务器
gulp.task('nodemon', (a)=> {
  let ft = false;
  return nodemon({
    script: 'app.js'
  }).on('start', ()=> {
    if (!ft) {
      a();
      ft = true;
    }
  });
});
//  proxy 服务器代理
gulp.task('browser-sync',['nodemon'] , ()=> {
  browserSync.init({
    proxy: {
      target: 'localhost/index.html'
    },
    files: ['*'],
    open: true,
    notify: false,
    port: 28000
  });
});

gulp.task('watch', ['browser-sync'], function(){


  gulp.watch('app/stylus/**/*.styl', ['stylus']);
 
  gulp.watch('app/view/**/*.html', ['html']) ;
  
  gulp.watch('app/js/**/*.js', ['script']);

  gulp.watch([
        'app/stylus/**/*.styl',
        'app/view/**/*.html',
        'app/js/**/*.js',
    ]).on('change', reload);


gulp.task('default',["nodemon"])