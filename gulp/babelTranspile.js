
var babelCore = require('babel-core')
var path = require('path')
var objectAssign = require('object-assign')

import configuration from './configuration'


const babelIgnoreRegexes = configuration.transpilationConfig.skip.map(function(item) {
    return babelCore.util.regexify(item);
});


export default function babelTranspile(pathname, callback) {
    if (babelIgnoreRegexes.some(function (re) { return re.test(pathname); })) return callback();
    if (!babelCore.util.canCompile(pathname)) return callback();
    var src  = path.join(configuration.transpilationConfig.root, pathname);
    var opts = objectAssign({ sourceFileName: '/source/' + pathname }, configuration.transpilationConfig.babelConfig);
    babelCore.transformFile(src, opts, callback);
}