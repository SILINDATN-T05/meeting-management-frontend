import { Component, OnInit, NgModule } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {MatDialogModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS} from '@angular/material';


@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})

export class NotificationComponent extends DialogComponent<{title:string, message:string, data?:string},{}> {
    user:any = {};
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  parseData(data){
    this.user = JSON.parse(data);
  }
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }
}
