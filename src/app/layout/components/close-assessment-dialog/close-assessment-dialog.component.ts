import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { IAssessment } from '../../../shared/interfaces/assessment.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-close-assessment-dialog',
  templateUrl: './close-assessment-dialog.component.html',
  styleUrls: ['./close-assessment-dialog.component.scss'],
  animations: [routerTransition()],
})
export class CloseAssessmentDialogComponent implements OnInit {
  Reasons = [
    {id: 7, name: 'MBR not available'},
{id: 12, name: 'Vehicle not available yet'},
{id: 13, name: 'MBR accepted parts'},
{id: 14, name: 'MBR declined parts'},
{id: 8, name: 'MBR requested contact at a later date'},
  ];
  searchForm: FormGroup;
  selectedAssessment: IAssessment;
  isLoading = false;
  selectedReason = new FormControl();
  constructor(
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<CloseAssessmentDialogComponent>) {

  }

  ngOnInit() {
    this.selectedAssessment = JSON.parse(sessionStorage.getItem('authorisedAssessment'));
    this.createForm();
  }
  Close() {
    this.dialogRef.close();
  }
  CloseAssessment() {
    this.isLoading = true;
    const vm = this;
    const options = {
      reason: vm.selectedReason.value,
      comments: sessionStorage.getItem('comments'),
      request_id: vm.selectedAssessment.REQUEST_ID,
    };
    this.request.PostRequest('api/assessment/close', options, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('Assessment status updated successfully', 'Assessment Close',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/authorised-assessment'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Assessment Close');
      }
    }, this.dialogRef);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
        contactDate: [new Date()],
    });
}

}
