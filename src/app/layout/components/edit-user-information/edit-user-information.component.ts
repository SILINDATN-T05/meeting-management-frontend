import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-edit-user-information',
  templateUrl: './edit-user-information.component.html',
  styleUrls: ['./edit-user-information.component.scss'],
  animations: [routerTransition()],
})
export class EditUserInformationComponent implements OnInit {

  user_details: IUser;
  user: IUser;
  userForm: FormGroup;
  Branches = [];
  // GlassParts = [];
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<EditUserInformationComponent>) {

  }

  ngOnInit() {
    this.user_details = JSON.parse(sessionStorage.getItem('update_user'));
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.Branches = JSON.parse(sessionStorage.getItem('branches'));
    this.createFrom(this.user_details);
  }
  Close() {
    this.dialogRef.close();
  }
  saveEditUser() {
    const vm = this;
    vm.isLoading = true;
    const update_user = vm.userForm.value;
    update_user['_id'] = vm.user_details._id;
    this.request.PostRequest('api/user/updated_user', {update_user}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('user updated successfully', 'Edit User',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Edit User');
      }
      vm.isLoading = false;
    }, this.dialogRef);
  }
  createFrom(user) {
    const branch_disable = this.user._id === this.user_details._id;
    this.userForm = this.formBuilder.group({
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      msisdn: [user.msisdn, [Validators.required]],
      branch: [{value: user.branch, disabled: branch_disable}, [Validators.required]],
      email: [{value: user.email, disabled: branch_disable}, [Validators.required, Validators.email]],
    });
  }
}
