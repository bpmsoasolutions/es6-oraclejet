export const requireJsConfig = {
    out: 'scripts.js',
    baseUrl: './temp',
    name: 'app/startup',
    paths: {
        'requireLib': 'bower_modules/requirejs/require'
    },
    include: [
        'requireLib',
        'containers/home/home',
        'containers/product/product',
        'components/nav-bar/nav-bar',
        'text!components/bss-footer/footer.html'
    ],
    insertRequire: ['app/startup'],
    bundles: {}
}