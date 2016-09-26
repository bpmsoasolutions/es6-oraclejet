import http from 'http'
import fs from 'fs'
import path from 'path'
import * as babel from 'babel-core'
import sass from 'node-sass'

import {ignores, presets, plugins} from '../config/babel'

// $ serve [src]

async function serve(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    let es6 = (args.indexOf('--es6') > -1)
    let scss = (args.indexOf('--scss') > -1)

    http.createServer((request, response) => {
        console.log('request ', request.url);

        //cors
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        response.setHeader('Access-Control-Allow-Credentials', true);

        let filePath = (request.url === '/') ?  `${args[0]}/index.html` : `${args[0]}${request.url}`
        filePath = path.resolve(filePath)

        let qPos = filePath.indexOf('?')
        if (qPos>-1){
            filePath = filePath.slice(0,qPos)
        }

        let extname = String(path.extname(filePath)).toLowerCase();
        let contentType = 'text/html';
        let mimeTypes = {
            '.html': 'text/html',
            '.js':   'text/javascript',
            '.css':  'text/css',
            '.json': 'application/json',
            '.png':  'image/png',
            '.jpg':  'image/jpg',
            '.gif':  'image/gif',
            '.wav':  'audio/wav',
            '.mp4':  'video/mp4',
            '.woff': 'application/font-woff',
            '.woff2': 'application/font-woff2',
            '.ttf':  'applilcation/font-ttf',
            '.eot':  'application/vnd.ms-fontobject',
            '.otf':  'application/font-otf',
            '.svg':  'application/image/svg+xml'
        };

        contentType = mimeTypes[extname] || 'application/octect-stream';

        if (scss && filePath.indexOf('styles.css') > -1){
            let {css} = sass.renderSync({
                file: 'src/scss/styles.scss'
            })
            response.writeHead(200, { 'Content-Type': 'text/css' })
            response.end(css.toString(), 'utf-8')
            return
        }

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if(error.code == 'ENOENT'){
                    response.writeHead(404)
                    response.end('Not found', 'utf-8')
                    return
                }
                response.writeHead(500)
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n')
                response.end()
                return
            }

            if (es6 && contentType === 'text/javascript'){
                let ignore = false
                for (var i = 0; i < ignores.length; i++) {
                    if (filePath.indexOf(ignores[i])>0){
                        ignore = true
                        break
                    }
                }

                if (!ignore){
                    let {code} = babel.transform(content, { presets, plugins })
                    content = code
                }
            }

            response.writeHead(200, { 'Content-Type': contentType })
            response.end(content, 'utf-8')
            return
        });

    }).listen(3000);
}

export default serve;
