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
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss'],
  animations: [routerTransition()],
})
export class AddUserRoleComponent implements OnInit {
  Roles = [];
  user_roles = [];
  user_details: any = {};
  isLoading = false;
  selectedRoles = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddUserRoleComponent>) {

  }

  ngOnInit() {
    this.GetRoles();
    this.user_details = JSON.parse(sessionStorage.getItem('update_user'));
    this.user_roles = this.user_details.roles || [];
  }
  GetRoles() {
    const vm = this;
    this.request.PostRequest('api/role/list_all', {query: {}}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Roles = res.data;
    }
    }, this.dialogRef);
  }
  Close() {
    this.dialogRef.close();
  }
  AddUserRoles() {
    this.isLoading = true;
    if (!this.user_details.roles) {
      this.user_details['roles'] = this.selectedRoles.value;
    } else {
      this.user_details.roles = _.concat(this.user_roles, this.selectedRoles.value);
    }
    const vm = this;
    this.request.PostRequest('api/user/updated_user', {update_user: this.user_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('User role added successfully', 'Add User Roles',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add User Roles');
      }
    }, this.dialogRef);
  }
  checkRole(role_id) {
    const found = _.indexOf(this.user_roles, role_id);
    return found >= 0;
  }
}
