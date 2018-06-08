import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Headers, Http} from '@angular/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { Logger } from '../core/logger.service';
import { routerTransition } from '../router.animations';
import { ICredentials } from '../shared/interfaces/response.interface';
const log = new Logger('Login');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()],
})
export class LoginComponent implements OnInit {

    version: string = environment.version;
    error: string = null;
    isReissue = false;
    loginForm: FormGroup;
    isLoading = false;
    hide = true;
    isRefresh = false;
    body = {
        channel: environment.tn_portal.channel,
        application: environment.tn_portal.application,
        organizationID: environment.tn_portal.organizationID,
    };
    Username = 'Enter username';
    Password = 'Enter password';

    constructor(public router: Router,
                private formBuilder: FormBuilder,
                private http: Http,
                private auth: AuthenticationService,
                public toastr:  ToastrService,
                vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.createForm();
        this.getToken();
    }

    getToken() {
        this.http.post('api/createSession/', this.body)
        .pipe(map((response) => response.json()))
        .subscribe((res) => {
          sessionStorage.setItem('token', res['token']);
          if (this.isRefresh) {
            this.onLoggedin();
          }
        });
    }

    onLoggedin() {
        this.isLoading = true;
        this.isReissue = false;
        this.isRefresh = false;
        const headers = new Headers({'x-access-token': sessionStorage.getItem('token'), 'Vary': 'Accept-Encoding'});
        this.loginForm.value['action'] = 'LOGIN';
        _.merge(this.loginForm.value, this.body);
        const vm = this;
        vm.http.post('api/service/', vm.loginForm.value, {headers})
        .pipe(map((response) => response.json()))
        .subscribe((res: ICredentials) => {
          vm.loginForm.markAsPristine();
          vm.isLoading = false;
          if (res.code === '00') {
            sessionStorage.setItem('user', JSON.stringify(res.data['user']));
            sessionStorage.setItem('permissions', JSON.stringify(res.data['permissions']));
            sessionStorage.setItem('request_major_status', JSON.stringify(res.data['request_major_status']));
            sessionStorage.setItem('request_minor_status', JSON.stringify(res.data['request_minor_status']));
            sessionStorage.setItem('request_part_status', JSON.stringify(res.data['request_part_status']));
            vm.auth.setCredentials(vm.loginForm.value, vm.loginForm.value.remember);
            log.debug(`${vm.loginForm.value.username} successfully logged in`);
            vm.router.navigate(['/dashboard'], { replaceUrl: true });
            localStorage.setItem('isLoggedin', 'true');
          } else if (res.code === '49') {
            this.isRefresh = true;
            this.getToken();
          } else {
            log.debug(`Login error: ${res.message}`);
            switch (res.message) {
              case '#auth_handler.auth.status.REISSUE':
                localStorage.setItem('_details', JSON.stringify(vm.loginForm.value));
                vm.toastr.warning('you logged in using a one time passsword, Please change your password.', 'NOTE',  {
                  timeOut: 3000,
                });
                vm.router.navigate(['/re-issue'], { replaceUrl: true });
                break;
              case '#auth_handler.password.invalid':
              vm.toastr.error('You have entered invalid login Credentials. Please try again later or Contact your system administrator.', 'ERROR');
              break;
              case '#auth_handler.credentials.invalid4':
              vm.toastr.error('You have entered invalid login Credentials. Please try again later or Contact your system administrator.', 'ERROR');
              break;
              case '#auth_handler.user.status.INACTIVE':
              vm.toastr.error('Your Account has been Deactivated. Please Contact your system administrator.', 'ERROR');
              break;
              case '#auth_handler.auth.status.INACTIVE':
              vm.toastr.error('Your Account has been Deactivated. Please Contact your system administrator.', 'ERROR');
              break;
              default:
              vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
            }
          }
        });
    }

    private createForm() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: false,
      });
    }

}
