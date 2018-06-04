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
  selector: 'app-add-application-permission',
  templateUrl: './add-application-permission.component.html',
  styleUrls: ['./add-application-permission.component.scss'],
  animations: [routerTransition()],
})
export class AddApplicationPermissionComponent implements OnInit {
  Permissions = [];
  application_permissions = [];
  application_details: any = {};
  isLoading = false;
  selectedPermissions = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddApplicationPermissionComponent>) {

  }

  ngOnInit() {
    this.GetPermissions();
    this.application_details = JSON.parse(sessionStorage.getItem('selectedApplication'));
    this.application_permissions = this.application_details.permissions || [];
  }
  GetPermissions() {
    const vm = this;
    this.request.PostRequest('api/permission/list_all', {query: {}}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Permissions = res.data;
    }
    }, this.dialogRef);
  }
  Close() {
    this.dialogRef.close();
  }
  AddApplicationPermissions() {
    this.isLoading = true;
    if (!this.application_details.permissions) {
      this.application_details['permissions'] = this.selectedPermissions.value;
    } else {
      this.application_details.permissions = _.concat(this.application_permissions, this.selectedPermissions.value);
    }
    const vm = this;
    this.request.PostRequest('api/application/edit', {applications: this.application_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('Application permisions added successfully', 'Add Application Permisions',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add Application Permisions');
      }
    }, this.dialogRef);
  }
  checkPermission(permission_id) {
    const found = _.indexOf(this.application_permissions, permission_id);
    return found >= 0;
  }
}
