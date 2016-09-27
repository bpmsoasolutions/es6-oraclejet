import shell from 'shelljs'

import recreateDir from './utils/recreateDir'
import copyByFound from './utils/copyByFound'
import copyFolders from './utils/copyFolders'
import copy from './utils/copy'
import clean from './utils/clean'

import jet from './common/jet'
import rjsOptimizer from './common/rjsOptimizer'
import components from './common/components'
import htmlReplace from './common/htmlReplace'

import run from './run'

// $ build

async function build(args) {
    await run(recreateDir, 'temp dist')
    await run(jet)
    await run(assets, 'temp -m --bower-modules')
    await run(components, 'temp')
    await run(htmlReplace, 'temp --production')
    await run(rjsOptimizer)
    await run(copy, '-Rf temp/index.html dist')
    await run(copy, '-Rf temp/scripts.js dist')
    await run(copy, '-Rf temp/styles.css dist')
    await run(clean, 'temp')
}

export default build;