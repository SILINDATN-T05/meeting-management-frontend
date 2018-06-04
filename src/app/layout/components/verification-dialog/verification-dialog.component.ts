import { Component, OnInit, Pipe, ViewContainerRef } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { IAssessment } from '../../../shared/interfaces/assessment.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-verification-dialog',
  templateUrl: './verification-dialog.component.html',
  styleUrls: ['./verification-dialog.component.scss'],
  animations: [routerTransition()],
})
export class VerificationDialogComponent implements OnInit {
  request_major_status = [];
  request_minor_status = [];
  selectedAssessment: IAssessment;
  isSuccess = false;
  isMbrFail = false;
  searchTerm = '';
  isWorkProviderFail = false;
  selectedWorkProvider = '';
  selectedMBR = '';
  isNextStep = true;
  isLoading = false;
  workProviderList = [];
  MBRList = [];
  isMatchWorkProvider = false;
  isMatchMBR = false;
  constructor(
      private router: Router,
      public dialogRef: MatDialogRef<VerificationDialogComponent>,
      private _request: RequestService,
      public toastr:  ToastrService,
      vcr: ViewContainerRef) {

       }

  ngOnInit() {
    this.selectedAssessment = JSON.parse(sessionStorage.getItem('selectedAssessment'));
    this.request_major_status = JSON.parse(sessionStorage.getItem('request_major_status'));
    this.request_minor_status = JSON.parse(sessionStorage.getItem('request_minor_status'));
    this.selectedWorkProvider = this.selectedAssessment.WORKPROVIDER_ID;
    this.checkSuccess();
  }
  Close() {
      this.dialogRef.close();
  }
    InputFilter(search, ev) {
        this.searchTerm = search;
        ev.stopPropagation();
    }
  displayMajorStatus(major_status_id) {
    if (this.request_major_status.length > 0) {
        const index = _.findIndex(this.request_major_status, { MAJOR_STATUS_ID: major_status_id });
        return index >= 0 ? this.request_major_status[index].MAJOR_STATUS : null;
    } else {
        return null;
    }
}
clearSearchTerm() {
    this.searchTerm = '';
}
checkSuccess() {
    this.isSuccess = _.findIndex(this.selectedAssessment.MINOR_STATUS_ID, function(o) {
        return o === 1;
    }) >= 0 && _.findIndex(this.selectedAssessment.MINOR_STATUS_ID, function(o) {
        return o === 3;
    }) >= 0;
    this.isMatchMBR = _.findIndex(this.selectedAssessment.MINOR_STATUS_ID, function(o) {
        return o === 3;
    }) < 0;
    this.isMatchWorkProvider = _.findIndex(this.selectedAssessment.MINOR_STATUS_ID, function(o) {
        return o === 1;
    }) < 0;
    if (this.isMatchMBR) {
        this.goToMatchMbr();
    } else if (this.isMatchWorkProvider) {
        this.goToMatchWork();
    }
}

displayMinorStatus(minor_status_id) {
    if (this.request_minor_status.length > 0) {
        const index = _.findIndex(this.request_minor_status, { MINOR_STATUS_ID: minor_status_id });
        return index >= 0 ? this.request_minor_status[index].MINOR_STATUS : null;
    } else {
        return null;
    }
}
goToMatched() {
    this.dialogRef.close();
    this.router.navigate(['/confirm-matched'], { replaceUrl: true });
}
goToMatchMbr() {
    const vm = this;
    const options = {
          query: {},
      };
    vm._request.PostRequest('api/mbr/work_provider_list/', options, function(res: ICredentials) {
          if (res.code === '00' && res.data) {
              vm.MBRList = res.data;
              vm.isMatchMBR = true;
              vm.isMatchWorkProvider = false;
              vm.isNextStep = false;
          } else {
              vm.toastr.warning('No mbr provider information found', 'NOTE');
          }
    }, vm.dialogRef);
}
goToMatchWork() {
    const vm = this;
    const options = {
          query: {},
      };
    vm._request.PostRequest('api/work_provider/list_all/', options, function(res: ICredentials) {
          if (res.code === '00' && res.data) {
              vm.workProviderList = res.data;
              vm.isMatchWorkProvider = true;
              vm.isNextStep = false;
              vm.isMatchMBR = false;
          } else {
              vm.toastr.warning('No work provider information found', 'NOTE');
          }
    }, vm.dialogRef);
}
saveMatchMbr() {
    const vm = this;
    const options = {
        mbr_name: vm.selectedMBR,
        request_id: vm.selectedAssessment.REQUEST_ID,
      };
    vm._request.PostRequest('api/mbr/match/', options, function(res: ICredentials) {
        if (res.code === '00' && res.data) {
            vm.selectedAssessment = res.data;
            sessionStorage.setItem('selectedAssessment', JSON.stringify(vm.selectedAssessment));
            vm.dialogRef.close();
        } else {
            vm.toastr.error('MBR match failed', 'ERROR');
        }
    }, vm.dialogRef);
}
saveMatchWork() {
    const vm = this;
    const options = {
        workprovider_id: vm.selectedWorkProvider,
        request_id: vm.selectedAssessment.REQUEST_ID,
      };
    vm._request.PostRequest('api/work_provider/match/', options, function(res: ICredentials) {
          if (res.code === '00' && res.data) {
              vm.selectedAssessment = res.data;
              sessionStorage.setItem('selectedAssessment', JSON.stringify(vm.selectedAssessment));
              vm.dialogRef.close();
          } else {
              vm.toastr.error('Work provider match failed', 'ERROR');
          }
    }, vm.dialogRef);
}
hideCard() {
    this.isMatchMBR = false;
    this.isMatchWorkProvider = false;
    this.isNextStep = true;
}
}
