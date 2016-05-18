import {Component, OnInit} from '@angular/core';
import {EventListComponent} from './+event-list/event-list.component';
import {Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {EventDetailsComponent} from "./+event-details/event-details.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: 'app/+dashboard/dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
@Routes([
    {path: '/event-list', component: EventListComponent},
    {path: '/event-details', component: EventDetailsComponent}
])
export class DashboardComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
