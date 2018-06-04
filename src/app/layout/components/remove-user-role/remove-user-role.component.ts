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
  selector: 'app-remove-user-role',
  templateUrl: './remove-user-role.component.html',
  styleUrls: ['./remove-user-role.component.scss'],
  animations: [routerTransition()],
})

export class RemoveUserRoleComponent implements OnInit {
  Roles = [];
  user_roles = [];
  user_details: any = {};
  isLoading = false;
  selectedRole = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<RemoveUserRoleComponent>) {

  }

  ngOnInit() {
    this.GetRoles();
    this.user_details = JSON.parse(sessionStorage.getItem('update_user'));
    this.user_roles = this.user_details.roles || [];
  }
  Close() {
    this.dialogRef.close();
  }
  GetRoles() {
    const vm = this;
    this.request.PostRequest('api/role/list_all', {query: {}}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Roles = res.data;
    }
    }, this.dialogRef);
  }
  RemoveUserRoles() {
    this.isLoading = true;
    this.user_details.roles = _.difference(this.user_roles, this.selectedRole.value);
    const vm = this;
    this.request.PostRequest('api/user/updated_user', {update_user: this.user_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('User role removed successfully', 'Remove User Role',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Remove User Role');
      }
    }, this.dialogRef);
  }
  displayRole(role_id) {
    const found = _.findIndex(this.Roles, {_id: role_id});
    return this.Roles[found].name;
  }
}
