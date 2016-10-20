import ko from 'knockout';
import template from 'text!./home.html';

class viewModel {
    constructor(route) {
        this.route = route.router.currentRoute()
        console.log(route)
    }

    dispose(){
        console.log('dispose: Home')
    }
}

export default { viewModel, template };
