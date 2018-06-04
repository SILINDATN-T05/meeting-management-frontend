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
  selector: 'app-add-role-permision-dialog',
  templateUrl: './add-role-permision-dialog.component.html',
  styleUrls: ['./add-role-permision-dialog.component.scss'],
  animations: [routerTransition()],
})
export class AddRolePermisionDialogComponent implements OnInit {
  Permissions = [];
  role_permissions = [];
  role_details: any = {};
  isLoading = false;
  selectedPermissions = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddRolePermisionDialogComponent>) {

  }

  ngOnInit() {
    this.GetPermissions();
    this.role_details = JSON.parse(sessionStorage.getItem('selectedRole'));
    this.role_permissions = this.role_details.permissions || [];
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
  AddRolePermissions() {
    this.isLoading = true;
    if (!this.role_details.permissions) {
      this.role_details['permissions'] = this.selectedPermissions.value;
    } else {
      this.role_details.permissions = _.concat(this.role_permissions, this.selectedPermissions.value);
    }
    const vm = this;
    this.request.PostRequest('api/role/edit', {role: this.role_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('role permisions added successfully', 'Add Role Permisions',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add Role Permisions');
      }
    }, this.dialogRef);
  }
  checkPermission(permission_id) {
    const found = _.indexOf(this.role_permissions, permission_id);
    return found >= 0;
  }
}
