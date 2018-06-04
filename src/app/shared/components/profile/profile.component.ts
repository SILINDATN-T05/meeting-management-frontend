import { Component} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './profile.html',
  styleUrls: ['./profile.component.scss'],
})
// tslint:disable-next-line:ban-types
export class DialogProfileComponent extends DialogComponent<{title: string, message: string, data?: Object}, {}> {
    user: any = {};
    title: string;
    message: string;
    data?: object;
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  parseData(data) {
    this.user = JSON.parse(data);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
}
