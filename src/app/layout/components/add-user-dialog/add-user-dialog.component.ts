import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
  animations: [routerTransition()],
})

export class AddUserDialogComponent implements OnInit {

  user: IUser;
  Roles: any = [];
  Platform = [
    'WEB-API',
    'PORTAL',
    'APP',
  ];
  isCompleted = false;
  user_details: any = {};
  Branches: any = [];
  selectedBranch = new FormControl();
  searchForm: FormGroup;
  title: string;
  message: string;
  data?: object;
  selectedRoles = new FormControl();
  selectedPlatform = new FormControl();
  color = 'primary';
  checked = false;
  disabled = false;
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddUserDialogComponent>) {

  }
  ngOnInit() {
    this.createForm();
  }
  Close() {
    this.dialogRef.close();
  }
  onStep1Next(event) {
    const vm = this;
    vm.user_details = vm.searchForm.value;
    vm.user_details.username = vm.user_details.email;
    vm.user_details.msisdn = vm.user_details.msisdn.toString();
    vm.user_details.msisdn = `${vm.user_details.msisdn.length === 9 ? '27' + vm.user_details.msisdn : vm.user_details.msisdn.length === 10 ? '27' + vm.user_details.msisdn.substring(1, 9) : vm.user_details.msisdn}`;
    this.request.PostRequest('api/role/list_org', {}, function(res: ICredentials) {
      if (res.code === '00') {
          vm.Roles = res.data;
      }
  }, this.dialogRef);
  }
  onStep2Next(event) {
    const vm = this;
    try {
    vm.Branches = JSON.parse(sessionStorage.getItem('branches'));
    if (vm.Branches.length === 0) {
      this.request.PostRequest('api/branch/list_all', {}, function(res: ICredentials) {
        if (res.code === '00') {
          vm.Branches = res.data;
        }
      }, this.dialogRef);
     }
    } catch (e) {
      // console.log(e.message);
      this.request.PostRequest('api/branch/list_all', {}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Branches = res.data;
      }
    }, this.dialogRef);
    }
  }
  onStep3Next(event) {
    this.isCompleted = false;
  }

  displayRole(role) {
    const found = _.findIndex(this.Roles, {_id: role});
    return this.Roles[found].name;
  }
  displayBranch(branch) {
    const found = _.findIndex(this.Branches, {_id: branch});
    return found > 0 ? this.Branches[found].name : null;
  }
  onComplete(event) {
    this.user_details['branch'] = this.selectedBranch.value || null;
    this.user_details['platform'] = this.selectedPlatform.value;
    this.user_details['roles'] = [];
    this.user_details.roles = this.selectedRoles.value;
    const vm = this;
    this.request.PostRequest('api/user/process_user', this.user_details, function(res: ICredentials) {
      if (res.code === '00') {
        vm.isCompleted = true;
        vm.toastr.success('user created successfully', 'Add User',   {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add User');
      }
    }, this.dialogRef);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    msisdn: ['',  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
    username: [''],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }
}
