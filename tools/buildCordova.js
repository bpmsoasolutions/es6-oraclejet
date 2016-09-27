import shell from 'shelljs'

import recreateDir from './utils/recreateDir'
import copy from './utils/copy'
import clean from './utils/clean'

import jet from './common/jet'
import rjsOptimizer from './common/rjsOptimizer'
import components from './common/components'
import htmlReplace from './common/htmlReplace'

import prepare from './cordova/prepare'
import compile from './cordova/compile'

import run from './run'

// $ buildCordova

async function buildCordova(args) {
    await run(recreateDir, 'temp app/www')
    await run(jet, '--cordova')
    await run(assets, 'temp -m --bower-modules')
    await run(components, 'temp')
    await run(htmlReplace, 'temp --cordova --production')
    await run(rjsOptimizer)
    await run(copy, '-Rf temp/index.html app/www')
    await run(copy, '-Rf temp/scripts.js app/www')
    await run(copy, '-Rf temp/styles.css app/www')
    await run(clean, 'temp')
    await run(prepare)
    await run(compile)
}

export default buildCordova;


