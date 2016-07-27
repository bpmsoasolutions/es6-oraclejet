// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "jquery":               "bower_modules/jquery/dist/jquery",
        "jqueryui-amd":         "bower_modules/jquery-ui/ui",
        "knockout":             "bower_modules/knockout/dist/knockout.debug",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "text":                 "bower_modules/requirejs-text/text",
        "promise":              "bower_modules/es6-promise/promise.min",
        "hammerjs":             "bower_modules/hammerjs/hammer.min",
        "ojdnd":                "bower_modules/oraclejet/dist/js/libs/dnd-polyfill/dnd-polyfill.min",
        "ojs":                  "bower_modules/oraclejet/dist/js/libs/oj/debug",
        "ojL10n":               "bower_modules/oraclejet/dist/js/libs/oj/ojL10n",
        "ojtranslations":       "bower_modules/oraclejet/dist/js/libs/oj/resources",
        "jet-komponents":       "bower_modules/jet-komponents/dist/jet-komponents",
        "moment":               "bower_modules/moment/min/moment.min",
        "axios":                "bower_modules/axios/dist/axios.min"
    },
    shim: {
        'jquery': {
            exports: ['jQuery', '$']
        }
    },
};
