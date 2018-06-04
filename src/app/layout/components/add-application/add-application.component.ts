import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss'],
  animations: [routerTransition()],
})
export class AddApplicationComponent implements OnInit {
  Platform = [
    'WEB-API',
    'PORTAL',
  ];
  searchForm: FormGroup;
  systemList = environment.systems;
  isCompleted = false;
  isLoading = false;
  application_details: any = {};
  Permissions: any = [];
  selectedSystem = new FormControl();
  selectedPermissions = new FormControl();
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddApplicationComponent>) {

  }

  ngOnInit() {
    this.createForm();
  }
  Close() {
    this.dialogRef.close();
    // this.router.navigate(['/application-management'], { replaceUrl: true });
  }
  onStep1Next(event) {
    const vm = this;
    vm.application_details = this.searchForm.value;
    vm.application_details.name = vm.application_details.name.replace(' ', '_').toUpperCase();
    vm.application_details.description = vm.application_details.description.toUpperCase();
  }
  onStep2Next(event) {
    const vm = this;
    this.request.PostRequest('api/permission/list_all', {query: {}}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.Permissions = res.data;
    }
    }, this.dialogRef);
  }
  onStep3Next(event) {
    this.isCompleted = false;
  }
  displayPermission(permission) {
    const found = _.findIndex(this.Permissions, {_id: permission});
    return this.Permissions[found].code;
  }
  onComplete(event) {
    this.isLoading = true;
    this.application_details['organizationID'] = this.selectedSystem.value;
    this.application_details['permissions'] = [];
    this.application_details.permissions = this.selectedPermissions.value;
    const vm = this;
    this.request.PostRequest('api/application/create', {applications: this.application_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.isCompleted = true;
        vm.toastr.success('Application created successfully', 'Add Application',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Add Application');
      }
    }, this.dialogRef);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      channel_name: ['', Validators.required],
    });
  }

}
