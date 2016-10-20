import ko from 'knockout';

// Components can be packaged as AMD modules, such as the following:
ko.components.register('home', { require: 'containers/home/home' });
ko.components.register('product', { require: 'containers/product/product' });

// Components:
ko.components.register('bss-nav-bar', { require: 'components/nav-bar/nav-bar' });
ko.components.register('bss-footer', { require: 'components/bss-footer/footer' });
