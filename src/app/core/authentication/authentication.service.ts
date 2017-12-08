import {Pipe, PipeTransform, Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as _ from "lodash";

export class EqualPipe implements PipeTransform {
  transform(items: any, filter: any): any {
    if (filter && Array.isArray(items)) {
        let filterKeys = Object.keys(filter);
        return items.filter(item =>
            filterKeys.reduce((memo, keyName) => {
                //console.log("Comparing");
                return item[keyName] === filter[keyName];}, true)
                );
    } else {
        return items;
    }
  }
}
export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  code?:string;
  message?:string;
  data?:any;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials;

  constructor(private http:Http) {
    //this.getToken();
    this._credentials = JSON.parse(sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey));
  }

  getToken(){
    this.http.post('createSession/',{})
    .map(response => response.json())
    .subscribe(res =>{
      console.log(res)
      sessionStorage.setItem('token',res['token']);
    })
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    // Replace by proper authentication call
    let data = {
      username: context.username,
      token: '123456'
    };
    let headers = new Headers({'x-access-token':sessionStorage.getItem('token')});
    context['action'] = 'LOGIN';
    this.http.post('service/',context, {headers:headers})
    .map(response => response.json())
    .subscribe((res:Credentials) =>{
      console.log(res)
      data = _.merge(data,res);
      //sessionStorage.setItem('token',res['token']);
    })
    this.setCredentials(data, context.remember);
    return Observable.of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return Observable.of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  public setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
