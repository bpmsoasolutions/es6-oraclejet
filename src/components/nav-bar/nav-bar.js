import ko from 'knockout';
import template from 'text!./nav-bar.html';
import {routes, title} from '../../app/config';
import 'ojs/ojknockout'
import 'ojs/ojdialog'
import 'ojs/ojtoolbar'
import 'ojs/ojbutton'
import 'ojs/ojmenu'
import 'ojs/ojinputtext'
import 'ojs/ojoffcanvas'

class NavBarViewModel {
    constructor (params) {
        // This viewmodel doesn't do anything except pass through the 'route' parameter to the view.
        // You could remove this viewmodel entirely, and define 'nav-bar' as a template-only component.
        // But in most apps, you'll want some viewmodel logic to determine what navigation options appear.
        this.route = params.route;
        this.appName = title;
        // Media Queries for repsonsive header
        var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
        this.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

        this.routes = new oj.ArrayTableDataSource(routes, {idAttribute: 'container'});
        this.selectedItem = ko.observable('home');
    }

    menuItemSelect(event, ui) {
        switch (ui.item.attr("id")) {
            case "about":
                $("#aboutDialog").ojDialog("open");
                break;
            default:
        }
    }

    toggleDrawer () {
        oj.OffcanvasUtils.toggle({
            displayMode: 'push',
            selector: '#offcanvas'
        });
    }

    openPopup = (data, event) => {
        $('#config').ojDialog("open");
        return true;
    }
}

export default { viewModel: NavBarViewModel, template: template };
