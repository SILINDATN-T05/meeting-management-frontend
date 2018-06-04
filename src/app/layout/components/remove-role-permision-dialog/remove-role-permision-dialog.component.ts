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
  selector: 'app-remove-role-permision-dialog',
  templateUrl: './remove-role-permision-dialog.component.html',
  styleUrls: ['./remove-role-permision-dialog.component.scss'],
  animations: [routerTransition()],
})
export class RemoveRolePermisionDialogComponent implements OnInit {
  Permissions = [];
  role_permissions = [];
  role_details: any = {};
  isLoading = false;
  selectedPermissions = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<RemoveRolePermisionDialogComponent>) {

  }

  ngOnInit() {
    this.GetPermissions();
    this.role_details = JSON.parse(sessionStorage.getItem('selectedRole'));
    this.role_permissions = this.role_details.permissions || [];
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
  RemoveRolePermissions() {
    this.isLoading = true;
    this.role_details.permissions = _.difference(this.role_permissions, this.selectedPermissions.value);
    const vm = this;
    this.request.PostRequest('api/role/edit', {role: this.role_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('role permisions removed successfully', 'Remove Role Permisions',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Remove Role Permisions');
      }
    }, this.dialogRef);
  }
  displayPermission(permission_id) {
    const found = _.findIndex(this.Permissions, {_id: permission_id});
    return this.Permissions[found].code;
  }

}
