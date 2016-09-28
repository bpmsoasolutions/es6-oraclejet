import ko from 'knockout';
import productTemplate from 'text!./product.html';

class Model {
    constructor(route) {
        this.route = route.router.currentRoute()
        console.log(this.route.url)
    }

    dispose(){
        console.log('dispose: Product')
    }
}

export default { viewModel: Model, template: productTemplate };
