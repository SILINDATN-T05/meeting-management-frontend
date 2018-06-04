import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { Logger } from '../../core/logger.service';
import { ICredentials } from '../interfaces/response.interface';
const log = new Logger('Request-service');
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class RequestService {

  // private _credentials: ICredentials;
  body = {
    channel: environment.parts_portal.channel,
    application: environment.parts_portal.application,
    organizationID: environment.parts_portal.organizationID,
  };
  constructor(private http: Http, private router: Router, public toastr:  ToastrService) {
  }

  PostRequest(url, data, callback, dialogRef = null) {
        const vm = this;
        const headers = new Headers({'x-access-token': sessionStorage.getItem('token'), 'Vary': 'Accept-Encoding'});
        _.merge(data, this.body);
        this.http.post(url, data, {headers})
    .pipe(map((response) => response.json()))
    .subscribe((res: ICredentials) => {
      if (res.code === '49') {
        localStorage.setItem('isLoggedin', 'false');
        vm.toastr.error('Server Session has Expired. Please login again', 'Request ERROR',  {
          timeOut: 5000,
        });
        try {
                    const jsd_widget = document.getElementById('jsd-widget');
                    jsd_widget.style.opacity = '0';
                } catch (err) {
                    log.debug(err.message);
                }
        if (dialogRef !== null) {
                  dialogRef.close();
                  vm.router.navigate(['/login'], { replaceUrl: true });
                }
        vm.router.navigate(['/login'], { replaceUrl: true });
      } else {
        try {
          if (res.data['data'] && res.data['data'] !== undefined) {
          callback(res.data);
        } else {
          callback(res);
        }
      } catch (e) {
        callback(res);
      }
      }
    });
  }

}
