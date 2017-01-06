var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'), 
    minifyCss = require('gulp-clean-css'),
    useref = require('gulp-useref'),
    fileinclude = require('gulp-file-include');

var rename = require("gulp-rename");

gulp.task('build', function(){
      
    gulp.src('index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss()))
      .pipe(fileinclude({
        prefix: 'gulp_inline@',
        basepath: '@file'
      }))
      .pipe(rename("production_index.html"))
      .pipe(gulp.dest(''));
  
    // gulp.src('./css/**/*.*', { base: './' })
    //   .pipe(gulp.dest('dist'));

    // gulp.src('./img/**/*.*', { base: './' })
    //   .pipe(gulp.dest('dist'));

    return;

});




