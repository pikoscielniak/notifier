import {Component, OnInit} from '@angular/core';

import {ConfirmService} from "./shared/confirm/confirm.service";
import {ConfirmComponent} from "./shared/confirm/confirm.component";
import {AuthManager} from "./shared/auth/authManager";

declare var componentHandler:any;

@Component({
    selector: 'notifier',
    templateUrl: 'app/app.component.html',
    directives: [ConfirmComponent],
    providers: [
        ConfirmService,
        AuthManager
    ]
})
export class AppComponent implements OnInit {

    title = "Notifier!!!";

    constructor(private _confirmService:ConfirmService,
                private _authManager:AuthManager) {
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
    }
}