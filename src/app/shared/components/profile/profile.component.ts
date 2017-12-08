import { Component, Input } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import {MatDialogModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS} from '@angular/material';

@Component({ 
  selector: 'confirm',
  templateUrl: './profile.html',
  styleUrls: ['./profile.component.scss']
})
export class DialogProfileComponent extends DialogComponent<{title:string, message:string, data?:string},{}> {
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