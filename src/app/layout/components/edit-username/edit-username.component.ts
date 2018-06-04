import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { RequestService } from '../../../shared/services/request.service';
import { MyErrorStateMatcher } from '../../../shared/validators/errorStateMatcher.validator';
import { unmatchOtherValidator } from '../../../shared/validators/unmatchOther.validator';

@Component({
  selector: 'app-edit-username',
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.scss'],
  animations: [routerTransition()],
})
export class EditUsernameComponent implements OnInit {
  user_details: IUser;
  usernameForm: FormGroup;
  isLoading = false;
  matcher = new MyErrorStateMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<EditUsernameComponent>) {

  }

  ngOnInit() {
    this.user_details = JSON.parse(sessionStorage.getItem('update_user'));
    this.createFrom(this.user_details);
  }
  Close() {
    this.dialogRef.close();
  }
  createFrom(user) {
    this.usernameForm = this.formBuilder.group({
      currentUsername: [{value: user.username, disabled: true}],
      newUsername: ['', [Validators.required, unmatchOtherValidator('currentUsername')]],
    });
  }
  saveUsername() {
    const vm = this;
    vm.isLoading = true;
    this.request.PostRequest('api/user/change_username', {update_user_id: vm.user_details._id, new_username: vm.usernameForm.value.newUsername}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('user created successfully', 'Add User',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add User');
      }
      vm.isLoading = false;
    }, this.dialogRef);
  }

}
