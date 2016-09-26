import del from 'del';

async function cleanCordova(opts) {
    await del([
        'app/platforms/**/*',
        '!app/platforms/platforms.json',
        'app/plugins/**/*',
        '!app/plugins/fetch.json',
        'app/merges/**/*',
        'app/www/**/*'
    ])
}

export default cleanCordova;