import shell from 'shelljs'
import fs from 'fs'

const index = fs.readFileSync('src/index.html', 'utf-8')

// $ htmlReplace [cordova or empty]

const textReplace = function(tagStart, tagEnd, replacement, text){
    if (!tagEnd){
        tagEnd = tagStart
    }

    let start = text.indexOf(tagStart)
    let end = text.indexOf(tagEnd)

    let startText = text.slice(0,start)
    let endText = text.slice(end+tagEnd.length,text.length)

    return `${startText}${replacement}${endText}`
}

async function htmlReplace(args) {
    args = (args) ? args.split(' ') : process.argv.slice(3, process.argv.length)

    let text = index

    let output = (args[0]) ? args[0] : 'temp'
    let cordova = (args.indexOf('--cordova') > -1)
    let production = (args.indexOf('--production') > -1)

    if (cordova) {
        text = textReplace('<!-- cordovaJs -->', null, '<script type="text/javascript" charset="utf-8" src="cordova.js"></script>', text)
    } else {
        text = textReplace('<!-- cordovaJs -->', null, '', text)
    }

    if (production){
        text = textReplace('<!-- startCss -->', '<!-- endCss -->', '<link rel="stylesheet" href="styles.css" type="text/css" />', text)
        text = textReplace('<!-- startJs -->', '<!-- endJs -->', '<script type="text/javascript" charset="utf-8" src="scripts.js"></script>', text)
    }

    text = textReplace('<!-- altaCss -->', null, `<link rel="stylesheet" href="oj-alta.css" type="text/css" />`, text)

    fs.writeFileSync(`${output}/index.html`, text, {encoding: 'utf-8'})
}
export default htmlReplace;