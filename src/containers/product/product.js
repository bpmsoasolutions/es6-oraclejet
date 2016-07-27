import ko from 'knockout';
import productTemplate from 'text!./product.html';

class Model {
    constructor(route) {
        console.log(route)
        this.route = route.router.currentRoute()
    }
}

export default { viewModel: Model, template: productTemplate };
