import shell from 'shelljs'

import run from './run';
import clean from './cordova/clean';
import add from './cordova/add';
import plugins from './cordova/plugins';
import prepare from './cordova/prepare';
import compile from './cordova/compile';
import serve from './cordova/serve';

import devCordova from './devCordova';
import jet from './jet';


// $ startCordova

async function startCordova(args) {
    await run(clean)
    await run(jet, 'cordova')
    await run(devCordova)
    await run(add, 'android browser')
    await run(plugins)
    await run(prepare)
    await run(compile, 'android')
    await run(serve, '--platform=android --destination=device')
}

export default startCordova;