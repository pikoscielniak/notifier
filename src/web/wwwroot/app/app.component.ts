import {Component, OnInit} from '@angular/core';

import {ConfirmService} from "./shared/confirm/confirm.service";
import {ConfirmComponent} from "./shared/confirm/confirm.component";

declare var componentHandler:any;

@Component({
    selector: 'notifier',
    templateUrl: 'app/app.component.html',
    directives: [ConfirmComponent],
    providers: [
        ConfirmService
    ]
})
export class AppComponent implements OnInit {

    title = "Notifier!!!";

    constructor(private _confirmService:ConfirmService) {
    }

    showConfirmDialog() {
        this._confirmService.activate("Are you sure?")
            .then(res => console.log(`Confirmed: ${res}`));
    }

    ngOnInit():any {
        componentHandler.upgradeDom();
    }
}