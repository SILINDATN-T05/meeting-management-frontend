import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, Credentials } from '../../core/authentication/authentication.service';
import * as _ from "lodash";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class RequestService {

  private _credentials: Credentials;
  body = {
    channel:environment.channel,
    application:environment.application,
    organizationID:environment.organizationID
  }
  constructor(private http:Http, private router:Router) {
  }

  PostRequest(url, data, callback){
    let headers = new Headers({'x-access-token':sessionStorage.getItem('token')});
    _.merge(data, this.body);
    this.http.post(environment.serverUrl+url, data, {headers:headers})
    .map(response => response.json())
    .subscribe((res:Credentials) =>{
      if(res.code==='49'){
        this.router.navigate(['/login'], { replaceUrl: true });
      }else{
        if(res.data['data'] && res.data['data']!=undefined){
          callback(res.data);
        }else{
          callback(res);
        }
      }
    })
  }

}
