var gulp = require('gulp');
//prior to adding require statement, install package using gulp
var browserify  = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var jshint = require('gulp-jshint');

var buildProduction = utilities.env.production;

// Development Server
var browserSync = require('browser-sync').create();
/*
We are calling browserSync.init() and passing in some options telling
browserSync to launch the local server from the directory that we are
currently in (baseDir: "./",) and we are telling it that the entry point,
the place where we want to start our app, is our index.html file. Now we
can run gulp serve from the top level of our project directory to launch
our server and run the app.

Now we're going to learn how to automatically replace the files on the server
and reload the browser when our JavaScript changes. To do this, we will use
a new gulp method called watch. When we call gulp.watch() we pass in 2 arguments.
The first is an array of file names that we want gulp to keep an eye on. The
second argument is an array of tasks to run whenever any of the aforementioned
files change. We'll add a call to gulp.watch inside of our serve task so that
the files are being watched automatically as soon as we start the server.
*/

// Watch tasks
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function(){
  browserSync.reload();
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });


  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function(){
  browserSync.reload();
});
// FRONTEND -- bower
/*
First, we require the bower-files package, which returns a function. We tell
that function to immediately run by placing an empty set of parenthesis
after the call to require: require('bower-files')();. When we run this
bower-files function, it returns a collection of all the files relevant
to the dependencies stored in our Bower manifest file bower.json.

note
There's one more thing we need to add before this will work.
This is a special case with Bootstrap CSS. Essentially, we need to tell
the bower-files package where to find the Bootstrap files that we are
interested in. We do this by passing an object into our initial call
to the bower-files package with some initialization settings in it.
*/
var lib = require('bower-files')({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});


//var lib = require('bower-files')();

/*
Then in our task we use gulp.src to pull in all the JavaScript files, and
output one concatenated, minified file called vendor.js that we will load
in our index.html file. We are filtering out only the .js files by using
the ext method built into bower-files. ext stands for "extension", and we
pass it in the extension we want ('js') as an argument. Finally, we use the
same gulp.dest method to put the finished file into our build/js directory.
*/
gulp.task('bowerJS', function () {
  return gulp.src(lib.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'));
});
gulp.task('bowerCSS', function(){
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/css'));
});
//combining above 2 tasks into one
/*
We have created a task we can now run with gulp bower any time we add a bower dependency.

This task has no callback function, but it has 2 dependency tasks: bowerJS and
bowerCSS. Incidentally, it is important to note that the order of the tasks in
the dependency array is ignored by gulp. So we can't use this method if we need
one task to be completed before the next one in the array begins. Our bower task
above will run both the bowerJS and bowerCSS tasks concurrently. This is nice
because it is faster than running them one after the other! But if we need to
run task1 before task2, then we must specify task1 as a dependency of task2,
not just list them in order as part of a third master task.
*/
gulp.task('bower', ['bowerJS', 'bowerCSS']);

// BACKEND

// stand alone tool, not used in build tasks
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// called by build:  deletes contents of build and tmp folders
gulp.task('clean', function(){
  return del(['build', 'tmp']);
});

// Note on using start within build task from class materials
/*
Finally, a short note on gulp.start. The gulp.start function is undocumented
on purpose because according to the gulp project developers it will be
deprecated at some point in the future in a new version of gulp and it
is actually inherited from a different framework. However, it is very
common to see it used in this fashion to allow us to trigger tasks based
on a conditional statement, but developers are encouraged to use dependencies
wherever possible rather than gulp.start to trigger tasks at the correct time.

Bower note
Let's make sure that this bower task runs automatically when we build. Since we
will always want to include our vendor files whether or not we are making a
production build, we will just call the bower task using gulp.start at the
end of our build task.
*/
gulp.task('build', ['clean'], function() {
  if(buildProduction){
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});
// naming for UI modules:  formA-interface.js, sign-up-interface.js...
gulp.task('concatInterface', function(){
  return gulp.src(['./js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
  .pipe(uglify())
  .pipe(gulp.dest("./build/js"));
});

gulp.task('jsBrowserify' , ['concatInterface'] , function () {
  return browserify ( { entries: ['./tmp/allConcat.js'] })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});


gulp.task('myTask', function() {
  console.log('hello gulp');
});
