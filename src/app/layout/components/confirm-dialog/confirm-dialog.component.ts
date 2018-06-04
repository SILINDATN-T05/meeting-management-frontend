import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  animations: [routerTransition()],
})
export class ConfirmDialogComponent implements OnInit {

  dialogTitle = 'Not Title';
  dialogMessage = 'No Message';
  action = '';
  data: any = {};
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    vcr: ViewContainerRef,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>) {
     }

  ngOnInit() {
    this.dialogTitle =  sessionStorage.getItem('title');
    this.dialogMessage = sessionStorage.getItem('message');
    this.action = sessionStorage.getItem('action');
    this.data = JSON.parse(sessionStorage.getItem('data'));
  }
  Close() {
    this.dialogRef.close();
  }
  doAction() {
    switch (this.action) {
      case 'password-reissue':
        this.reissuePassword();
        break;
      default:
        this.toastr.error('The is no action provided', 'Confirm Dialog');
        // this.dialogRef.close();
    }
  }
  reissuePassword() {
    const vm = this;
    const options = {
      query: {
        msisdn: this.data.msisdn,
      },
    };
    this.request.PostRequest('api/user/reissue_user_password', options, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('user password successfully re-issued', vm.dialogTitle,  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
      } else {
        vm.toastr.error(res.message, vm.dialogTitle,   {
          timeOut: 3000,
        });
        vm.dialogRef.close();
      }
    }, this.dialogRef);
  }

}
