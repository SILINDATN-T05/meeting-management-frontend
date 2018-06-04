import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { IAssessment } from '../../../shared/interfaces/assessment.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-cancel-assessment-dialog',
  templateUrl: './cancel-assessment-dialog.component.html',
  styleUrls: ['./cancel-assessment-dialog.component.scss'],
  animations: [routerTransition()],
})
export class CancelAssessmentDialogComponent implements OnInit {
  Reasons = [
    'Parts not on hand',
    'No illustrations',
    'Incorrect vehicle information',
  ];
  selectedAssessment: IAssessment;
  isLoading = false;
  selectedReason = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<CancelAssessmentDialogComponent>) {

  }

  ngOnInit() {
    this.selectedAssessment = JSON.parse(sessionStorage.getItem('selectedAssessment'));
  }
  Close() {
    this.dialogRef.close();
  }
  CancelAssessment() {
    this.isLoading = true;
    const vm = this;
    const options = {
      reason: vm.selectedReason.value,
      comments: sessionStorage.getItem('comments'),
      request_id: vm.selectedAssessment.REQUEST_ID,
    };
    this.request.PostRequest('api/assessment/cancel', options, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('Assessment cancelled successfully', 'Assessment Cancellation',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/verification'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Assessment Cancellation');
      }
    }, this.dialogRef);
  }

}
