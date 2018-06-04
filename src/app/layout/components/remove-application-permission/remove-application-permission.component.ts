import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-remove-application-permission',
  templateUrl: './remove-application-permission.component.html',
  styleUrls: ['./remove-application-permission.component.scss'],
  animations: [routerTransition()],
})
export class RemoveApplicationPermissionComponent implements OnInit {

  Permissions = [];
  application_permissions = [];
  application_details: any = {};
  isLoading = false;
  selectedPermissions = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<RemoveApplicationPermissionComponent>) {

  }

  ngOnInit() {
    this.GetPermissions();
    this.application_details = JSON.parse(sessionStorage.getItem('selectedApplication'));
    this.application_permissions = this.application_details.permissions || [];
  }
  Close() {
    this.dialogRef.close();
  }
  GetPermissions() {
    const vm = this;
    this.request.PostRequest('api/permission/list_all', {query: {}}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Permissions = res.data;
    }
    }, this.dialogRef);
  }
  RemoveApplicationPermissions() {
    this.isLoading = true;
    this.application_details.permissions = _.difference(this.application_permissions, this.selectedPermissions.value);
    const vm = this;
    this.request.PostRequest('api/application/edit', {applications: this.application_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('application permisions removed successfully', 'Remove Application Permisions',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Remove Application Permisions');
      }
    }, this.dialogRef);
  }
  displayPermission(permission_id) {
    const found = _.findIndex(this.Permissions, {_id: permission_id});
    return this.Permissions[found].code;
  }
}
