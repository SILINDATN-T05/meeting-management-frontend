import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Headers, Http} from '@angular/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { routerTransition } from '../router.animations';
import { IDetails } from '../shared/interfaces/details.interface';
import { ICredentials } from '../shared/interfaces/response.interface';
import { matchOtherValidator } from '../shared/validators/matchOther.validator';
import { passwordValidator } from './../shared/validators/password.validator';
const log = new Logger('Reissue');

@Component({
    selector: 'app-reissue',
    templateUrl: './reissue.component.html',
    styleUrls: ['./reissue.component.scss'],
    animations: [routerTransition()],
})
export class ReissueComponent implements OnInit {

    version: string = environment.version;
    error: string = null;
    isReissue = false;
    hide = true;
    _details: IDetails;
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
    body = {
        channel: environment.tn_portal.channel,
        application: environment.tn_portal.application,
        organizationID: environment.tn_portal.organizationID,
    };

    constructor(public router: Router,
                private formBuilder: FormBuilder,
                private http: Http,
                public toastr:  ToastrService,
                vcr: ViewContainerRef) {

    }

    ngOnInit() {
        this.createForm();
        this._details = JSON.parse(localStorage.getItem('_details'));
        delete this._details['action'];
    }
    onChangePassword() {
          const vm = this;
          if (this._details.password !== this.reissueForm.value.newPassword && this._details.password === this.reissueForm.value.currentPassword) {
        _.merge(this.body, this._details);
        this.isLoading = true;
        this.isReissue = false;
        const headers = new Headers({'x-access-token': sessionStorage.getItem('token'), 'Vary': 'Accept-Encoding'});
        this.reissueForm.value['action'] = 'CHANGE-PASSWORD';
        _.merge(this.reissueForm.value, this.body);
        this.http.post('api/service/', this.reissueForm.value, {headers})
        .pipe(map((response) => response.json()))
        .subscribe((res: ICredentials) => {
          vm.reissueForm.markAsPristine();
          vm.isLoading = false;
          if (res.code === '00' && res.message === 'success') {
            vm.isReissue = true;
            vm.toastr.warning('you have successfully changed your password. You will be redirected to Login.', 'NOTE', {
              timeOut: 3000,
            });
            vm.router.navigate(['/login'], { replaceUrl: true });
          } else {
            log.debug(`Reissue error: ${res.message}`);
            switch (res.message) {
              case '#auth_handler.auth.status.REISSUE':
              vm.toastr.warning('you logged in using a one time passsword, Please change your password.', 'NOTE');
              break;
              default:
              vm.toastr.error('Technical error has occured, please try again or contact your system administrator', 'ERROR');
            }
          }
        });
      } else if (this._details.password !== this.reissueForm.value.currentPassword) {
        this.toastr.error('Current password entered is incorrect', 'ERROR');
      } else {
        this.toastr.error('Your new password cannot be the same as the old password', 'ERROR');
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
