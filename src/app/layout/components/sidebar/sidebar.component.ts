import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    isActive = false;
    showMenu = '';
    Permissions = [];
    ngOnInit() {
       this.Permissions = JSON.parse(sessionStorage.getItem('permissions'));
    }

    // eventCalled() {
    //     this.isActive = !this.isActive;
    // }
    checkPermission(permission) {
        const found = _.findIndex(this.Permissions, {code: permission});
        return found < 0;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
