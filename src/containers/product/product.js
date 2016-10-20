import ko from 'knockout';
import template from 'text!./product.html';

class viewModel {
    constructor(route) {
        this.route = route.router.currentRoute()
        console.log(this.route)
    }

    dispose(){
        console.log('dispose: Product')
    }
}

export default { viewModel, template };
