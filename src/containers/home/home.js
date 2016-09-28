import ko from 'knockout';
import homeTemplate from 'text!./home.html';

class Model {
    constructor(route) {
        this.route = route.router.currentRoute()
        console.log(this.route.url)
    }

    dispose(){
        console.log('dispose: Home')
    }
}

export default { viewModel: Model, template: homeTemplate };
