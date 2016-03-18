import {Component} from 'angular2/core';
@Component({
    selector: 'notifier',
    template: `<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header"> 
        <header class="mdl-layout__header"><h1>{{title}}</h1></header>
    </div>`
})
export class AppComponent { 
    title = "Notifier!!!";
}