import ko from 'knockout';
import homeTemplate from 'text!./home.html';

class Model {
    constructor(route) {
        console.log(route)
        this.route = route.router.currentRoute()
    }
}

export default { viewModel: Model, template: homeTemplate };
