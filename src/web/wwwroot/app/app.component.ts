import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import {ConfirmService} from "./shared/confirm/confirm.service";
import {ConfirmComponent} from "./shared/confirm/confirm.component";
import {AuthManager} from "./shared/auth/authManager";
import {MainPageComponent} from "./+main-page/main-page.component";
import {DashboardComponent} from "./+dashboard/dashboard.component";

declare var componentHandler:any;

@Component({
    selector: 'notifier',
    templateUrl: 'app/app.component.html',
    directives: [ConfirmComponent, ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        ConfirmService,
        AuthManager
    ]
})
@Routes([
    {path: '/main-page', component: MainPageComponent},
    {path: '/dashboard', component: DashboardComponent}
])
export class AppComponent implements OnInit {

    title = "Notifier!!!";

    constructor(private _confirmService:ConfirmService,
                private _authManager:AuthManager,
                private _router:Router) {
    }

    showConfirmDialog() {
        this._confirmService.activate("Are you sure?")
            .then(res => console.log(`Confirmed: ${res}`));
    }

    login() {
        this._authManager.getToken();
    }

    ngOnInit():any {
        componentHandler.upgradeDom();
        this._router.navigate(['/main-page']);
        // this._router.navigate(['/dashboard/event-list']);
    }
}
