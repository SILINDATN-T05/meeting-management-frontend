import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, Credentials } from '../core/authentication/authentication.service';
import { Logger } from '../core/logger.service';
import * as _ from "lodash";
import { NotificationComponent } from "./../shared/components/notification/notification.component";
import { DialogService } from "ng2-bootstrap-modal";

const log = new Logger('Login');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    version: string = environment.version;
    error: string = null;
    loginForm: FormGroup;
    isLoading = false;
    body = {
        channel:environment.channel,
        application:environment.application,
        organizationID:environment.organizationID
    }

    constructor(public router: Router,
        private formBuilder: FormBuilder,
        private http:Http,
        private auth:AuthenticationService,
        private dialogService:DialogService) {
    }

    ngOnInit() {
        this.createForm();
        this.getToken();
    }

    // onLoggedin() {
    //     localStorage.setItem('isLoggedin', 'true');
    // }
    getToken(){
        this.http.post(environment.serverUrl+'createSession/',this.body)
        .map(response => response.json())
        .subscribe(res =>{
          console.log(res)
          sessionStorage.setItem('token',res['token']);
        })
      }
      onLoggedin() {
          this.isLoading = true;
          let headers = new Headers({'x-access-token':sessionStorage.getItem('token')});
          this.loginForm.value['action'] = 'LOGIN';
          _.merge(this.loginForm.value, this.body);
          this.http.post(environment.serverUrl+'service/',this.loginForm.value, {headers:headers})
          .map(response => response.json())
          .subscribe((res:Credentials) =>{
            console.log(res)
            this.loginForm.markAsPristine();
            this.isLoading = false;
            if(res.code==='00'){
              sessionStorage.setItem('user',JSON.stringify(res.data['user']));
              sessionStorage.setItem('permissions',JSON.stringify(res.data['permissions']));
              this.auth.setCredentials(this.loginForm.value, this.loginForm.value.remember);
              log.debug(`${this.loginForm.value.username} successfully logged in`);
              this.router.navigate(['/dashboard'], { replaceUrl: true });
              localStorage.setItem('isLoggedin', 'true');
            }else{
              log.debug(`Login error: ${res.message}`);
              switch(res.message){
                case '#auth_handler.auth.status.REISSUE':
                  this.notification('NOTE', 'you logged in using a one time passsword, Please change your password.');
                  break;
                default:
                  this.notification('ERROR', 'Technical error has occured, please try again or contact your system administrator');
              }
            }
          })
      }
      notification(title, message){
        let disposable = this.dialogService.addDialog(NotificationComponent, {
          title:title, 
          message:message})
          .subscribe((isConfirmed)=>{
              //We get dialog result
            console.log(isConfirmed)
          });
      }
      private createForm() {
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          remember: false
        });
      }

}
