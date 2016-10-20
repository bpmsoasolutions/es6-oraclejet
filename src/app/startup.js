import 'jquery';
import ko from 'knockout';
import 'knockout-projections'
import * as router from './router'
import jetKomponents from 'jet-komponents'
import 'ojs/ojcore'
import 'ojs/ojbutton'
import 'ojs/ojnavigationlist'
import 'ojs/ojknockout'
import 'ojs/ojarraytabledatasource'
import {copyright} from './config'
import './register'

jetKomponents.register(ko);

class MainModel {
    constructor() {
        this.copyright = copyright;
        this.router = router;
        console.log(router.currentRoute())
    }
}

function init(){
    ko.applyBindings(new MainModel, document.getElementById('globalBody'));
}


if ($(document.body).hasClass('oj-hybrid')) {
    document.addEventListener("deviceready", init);
} else {
    init();
}