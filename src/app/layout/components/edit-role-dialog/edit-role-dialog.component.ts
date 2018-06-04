import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.scss'],
  animations: [routerTransition()],
})
export class EditRoleDialogComponent implements OnInit {
  searchForm: FormGroup;
  role_details: any = {};
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<EditRoleDialogComponent>) {

  }

  ngOnInit() {
    this.role_details = JSON.parse(sessionStorage.getItem('selectedRole'));
    this.createForm(this.role_details);
  }
  Close() {
    this.dialogRef.close();
  }
  onComplete() {
    const vm = this;
    vm.isLoading = true;
    vm.role_details.name = vm.searchForm.value.name.toUpperCase();
    vm.role_details.description = vm.searchForm.value.description.toUpperCase();
    vm.request.PostRequest('api/role/edit', {role: vm.role_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('role updated successfully', 'Edit Role',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Edit Role');
      }
    }, vm.dialogRef);
  }
  private createForm(details) {
    this.searchForm = this.formBuilder.group({
      name: [details.name, Validators.required],
      description: [details.description, Validators.required],
    });
  }
}
