import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss'],
  animations: [routerTransition()],
})
export class AddRoleDialogComponent implements OnInit {
  searchForm: FormGroup;
  systemList = environment.systems;
  isCompleted = false;
  isLoading = false;
  role_details: any = {};
  Permissions: any = [];
  selectedSystem = new FormControl();
  selectedPermissions = new FormControl();
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddRoleDialogComponent>) {

  }

  ngOnInit() {
    this.createForm();
  }
  Close() {
    this.dialogRef.close();
    this.router.navigate(['/roles-management'], { replaceUrl: true });
  }
  onStep1Next(event) {
    const vm = this;
    vm.role_details = this.searchForm.value;
    vm.role_details.name = vm.role_details.name.replace(' ', '_').toUpperCase();
    vm.role_details.description = vm.role_details.description.toUpperCase();
  }
  onStep2Next(event) {
    const vm = this;
    this.request.PostRequest('api/permission/list_all', {query: {}}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Permissions = res.data;
    }
    }, this.dialogRef);
  }
  onStep3Next(event) {
    this.isCompleted = false;
  }
  displayPermission(permission) {
    const found = _.findIndex(this.Permissions, {_id: permission});
    return this.Permissions[found].code;
  }
  onComplete(event) {
    this.isLoading = true;
    this.role_details['organizationID'] = this.selectedSystem.value;
    this.role_details['permissions'] = [];
    this.role_details.permissions = this.selectedPermissions.value;
    const vm = this;
    this.request.PostRequest('api/role/create', {role: this.role_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.isCompleted = true;
        vm.toastr.success('role created successfully', 'Add Role',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add Role');
      }
    }, this.dialogRef);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
