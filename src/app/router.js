import ko from 'knockout';
import crossroads from 'crossroads';
import hasher from 'hasher';
import {routes} from './config';

class Router {
    constructor(config) {
        this.currentRoute = ko.observable({});

        ko.utils.arrayForEach(config.routes, (route) => {
            crossroads.addRoute(route.url, (requestParams) => {
                this.currentRoute(Object.assign({}, requestParams, route));
            });
        });

        crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
        hasher.initialized.add(hash => crossroads.parse(hash));
        hasher.changed.add(hash => crossroads.parse(hash));

        hasher.init();
    }

    goTo(name, params, force){
        routes.map((r)=>{
            if (r.container === name){
                let url = r.urlClean
                if (params){
                    url = url + '?'
                    Object.keys(params).map((el, i)=>{
                        if (i>0){
                            url = url + '&'
                        }
                        url = url + el + '=' + params[el]
                    })
                }
                if (url.charAt(0) === '/'){
                    url = url.substr(1)
                }
                hasher.setHash(url);
                if (force){
                    this.forceRefresh()
                }
            }
        })
    }

    forceRefresh(){
        window.location.reload()
    }
}

var routerInstance = new Router({
    routes: routes
});

export default routerInstance;
