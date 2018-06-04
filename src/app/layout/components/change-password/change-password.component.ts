import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http} from '@angular/http';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { Logger } from '../../../core/logger.service';
import { routerTransition } from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { RequestService } from '../../../shared/services/request.service';
import { matchOtherValidator } from '../../../shared/validators/matchOther.validator';
import { passwordValidator } from '../../../shared/validators/password.validator';
const log = new Logger('Change-Password');

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [routerTransition()],
})
export class ChangePasswordComponent implements OnInit {

  version: string = environment.version;
  error: string = null;
  isReissue = false;
  hide = true;
  user_details: IUser;
  isPasswordInValid = true;
  reissueForm: FormGroup;
  isLoading = false;
  passwordValidatorOptions = {
    minLength: 8,
    maxLength: 50,
    requireLetters: true,
    requireLowerCaseLetters: true,
    requireUpperCaseLetters: true,
    requireNumbers: true,
    requireSpecialCharacters: true,
  };

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private http: Http,
              private request: RequestService,
              public toastr:  ToastrService,
              vcr: ViewContainerRef,
              public dialogRef: MatDialogRef<ChangePasswordComponent>) {

  }

  ngOnInit() {
    this.createForm();
    this.user_details = JSON.parse(sessionStorage.getItem('update_user'));
}

Close() {
  this.dialogRef.close();
}

onChangePassword() {
  const vm = this;
  if (vm.reissueForm.value.currentPassword !== vm.reissueForm.value.newPassword) {
    vm.isLoading = true;
    vm.isReissue = false;
    vm.reissueForm.value['trans_type'] = 'PASSWORD0001';
    vm.reissueForm.value['username'] = vm.user_details.username;
    vm.reissueForm.value['password'] = vm.reissueForm.value.currentPassword;
    vm.request.PostRequest('api/transaction/', vm.reissueForm.value, function(res: ICredentials) {
      vm.reissueForm.markAsPristine();
      vm.isLoading = false;
      if (res.code === '00' && res.message === 'success') {
        vm.isReissue = true;
        vm.toastr.warning('you have successfully changed your password. Plese use it on your next login.', 'NOTE');
      } else {
        log.debug(`Reissue error: ${res.message}`);
        switch (res.message) {
          case '#auth_handler.auth.status.REISSUE':
            vm.toastr.error('Your passsword has been recently changed to one time password, Please change your password.', 'NOTE');
            break;
          case '#auth_handler.password.invalid':
            vm.toastr.error('You have entered an incorrect current passsword, please try again or contact your system administrator.', 'NOTE');
            break;
          case 'auth_handler.password.invalid':
            vm.toastr.error('You have entered an incorrect current passsword, please try again or contact your system administrator.', 'NOTE');
            break;
          default:
            vm.toastr.error('Technical error has occured, please try again or contact your system administrator', 'ERROR');
            // vm.toastr.error(res.message, 'ERROR');
        }
      }
    }, vm.dialogRef);
  // } else if (vm._details.password !== vm.reissueForm.value.currentPassword) {
  //   vm.toastr.error('Current password entered is incorrect', 'ERROR');
  } else {
    vm.toastr.error('Your new password cannot be the same as the old password', 'ERROR');
  }

}
checkPassword(error) {
  this.isPasswordInValid = error !== null;
}
private createForm() {
  this.reissueForm = this.formBuilder.group({
    newPassword: ['', [Validators.required, passwordValidator(this.passwordValidatorOptions)]],
    currentPassword: ['', Validators.required],
    confirmPassword: ['', [Validators.required, matchOtherValidator('newPassword')]],
  });
}

}
