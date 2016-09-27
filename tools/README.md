## Build Automation Tools

This project have a bunch of functions that need babel-node to be run, because we use async/await functions that are available on ES6.

##### File Utils `utils/*`

* Clean: `$ clean dir1 dir2 dir3...` Clean directories
* Copy: `$copy -rf src/css.css temp` Copy single files
* CopyByFound: `$ copyByFound src/**/*.html src temp bower_modules` Find files by a regex, and copy the same folder structure to dest, also you can ignore by a regex some paths.
* CopyFolders: `$ copyFolders src/bower_modules temp/bower_modules` Copy folders to destination using ncp

##### Cordova `cordova/*`
Perform all actions of cordova over the `app` folder

##### Config  `config/*`

* babel: Contains all babel config used by the transpiler
* rjs: Contains all config of the native require js bundler

##### Common tasks `common/*`

* assets: `$ assets dir` Compile the scss of the app and also merge with other bower modules css, and output to dir folder. (In the file you will found an example with Font awesome, in this case also copy fonts to output directory)
    * `-m`: to mimify all css of the app with the css of bower modules
    * `--bower-modules`: merge the local css with the bower modules
* htmlReplace: `$ htmlReplace` Replace some parts of the index.html to add scripts or remove depending on the Options
    * `--cordova`: add on a special tag the cordova.js for cordova outputs
    * `--production`: substitiute the tags by the optimised scripts and css
* jet: `$ jet`: Copy the styles and static files necessaries by jet
    * `--cordova`: Copy also the necessaries files to make the style for the different platforms
* rjsOptimizer: `$ rjsOptimizer` use the native requireJs optimizer to output a single script file, based on specified configuration (rjs.config.js)
* serve: `$ serve dir` Serve static folder
    * `--es6`: Take the ES6 and compile on runtime the output to ES5 on runtime
    * `--scss`: find the styles.css and if you activate compile the scss on runtime
* components: `$ components [dir]` transpiles all ES6 to ES5, with babel, also copy the *.html files of the components to the dest folders and the requirejs.config ignored

##### Composed Tasks `*.js`
* build
* buildCordova
* dev
* devCordova
* startCordova

#### Misc

* `run.js` - Helps to launch other scripts with `babel-node` (e.g. `babel-node tools/run build`)
