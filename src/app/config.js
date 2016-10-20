import ko from 'knockout';

export let routes = [{
    url: '/',
    urlClean: '/',
    container: 'home',
    name: 'Home',
    iconClass: 'fa fa-home fa-2x oj-navigationlist-item-icon'
},{
    url: '/product:?query:',
    urlClean: '/product',
    container: 'product',
    name: 'Product',
    iconClass: 'fa fa-product-hunt fa-2x oj-navigationlist-item-icon'
}];

export let title = ko.observable('JET Test');
export let copyright = ko.observable('Your company 2016');