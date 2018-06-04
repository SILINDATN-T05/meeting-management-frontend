import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss'],
  animations: [routerTransition()],
})
export class EditApplicationComponent implements OnInit {
  searchForm: FormGroup;
  application_details: any = {};
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<EditApplicationComponent>) {

  }

  ngOnInit() {
    this.application_details = JSON.parse(sessionStorage.getItem('selectedApplication'));
    this.createForm(this.application_details);
  }
  onComplete() {
    const vm = this;
    vm.isLoading = true;
    vm.application_details.name = vm.searchForm.value.name.toUpperCase();
    vm.application_details.description = vm.searchForm.value.description.toUpperCase();
    vm.request.PostRequest('api/application/edit', {applications: vm.application_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('application updated successfully', 'Edit Application',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Edit Application');
      }
    }, vm.dialogRef);
  }
  private createForm(details) {
    this.searchForm = this.formBuilder.group({
      name: [details.name, Validators.required],
      description: [details.description, Validators.required],
    });
  }

  Close() {
    this.dialogRef.close();
  }
}
