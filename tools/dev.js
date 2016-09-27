import shell from 'shelljs'

import run from './run';
import serve from './common/serve';

// $ dev

async function dev() {
    await run(serve, 'src --es6 --sass')
}

export default dev;
