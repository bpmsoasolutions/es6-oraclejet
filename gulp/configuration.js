var fs = require('fs')
var vm = require('vm')
var merge = require('deeply')

var requireJsRuntimeConfig = fs.readFileSync('src/app/require.config.js')

let configuration = {

    allFiles: '**/*',

    paths: {
        'index': './src/index.html',
        'dist': './dist/',
        'temp': './temp/',
        'html': './src/**/*.html',
        'js': './src/**/*.js',
        'app': './src/app/',
        'css': './src/css/',
        'containers': './src/containers/',
        'components': './src/components/',

        'cordovaPluginsFile': 'app/plugins/fetch.json',
        'cordovaPlugins': 'app/plugins',
        'cordovaPlatforms': 'app/platforms'
    },

    replaceHtmlConfig: {
        'css-alta': 'css/alta.css',
        'css': 'css.css',
        'js': 'scripts.js'
    },

    transpilationConfig:{
        root: 'src',
        skip: ['bower_modules/**', 'app/require.config.js'],
        babelConfig: {
            sourceMaps: 'inline',
            plugins: ["add-module-exports", "transform-es2015-modules-amd"],
            presets: ['es2015', 'stage-0']
        }
    }
}

configuration.requireJsRuntimeConfig = vm.runInNewContext( requireJsRuntimeConfig + '; require;'),
configuration.requireJsOptimizerConfig = merge(configuration.requireJsRuntimeConfig, {
    out: 'scripts.js',
    baseUrl: './src',
    name: 'app/startup',
    paths: {
        requireLib: 'bower_modules/requirejs/require'
    },
    include: [
        'requireLib',
        'containers/home/home',
        'containers/product/product',
        'components/nav-bar/nav-bar',
        'text!components/bss-footer/footer.html'
    ],
    insertRequire: ['app/startup'],
    bundles: {
        // If you want parts of the site to load on demand, remove them from the 'include' list
        // above, and group them into bundles here.
        // 'bundle-name': [ 'some/module', 'another/module' ],
        // 'another-bundle-name': [ 'yet-another-module' ]
    }
})

var target = process.env.TARGET

if (target === 'cordova'){
    configuration.paths.dist = './app/www/'
}
configuration.separatorCLI= 'win32' == process.platform ? " && " : ";"

export default configuration