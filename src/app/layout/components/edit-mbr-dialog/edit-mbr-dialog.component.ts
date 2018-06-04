import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-edit-mbr-dialog',
  templateUrl: './edit-mbr-dialog.component.html',
  styleUrls: ['./edit-mbr-dialog.component.scss'],
  animations: [routerTransition()],
})
export class EditMbrDialogComponent implements OnInit {

  mbr_details: IUser;
  user: IUser;
  mbrForm: FormGroup;
  Branches = [];
  // GlassParts = [];
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    vcr: ViewContainerRef, public dialogRef: MatDialogRef<EditMbrDialogComponent>) {
  }

  ngOnInit() {
    this.mbr_details = JSON.parse(sessionStorage.getItem('update_mbr'));
    this.createFrom(this.mbr_details);
  }
  Close() {
    this.dialogRef.close();
  }
  saveEditMbr() {
    const vm = this;
    vm.isLoading = true;
    const update_mbr = vm.mbrForm.value;
    update_mbr['_id'] = vm.mbr_details._id;
    this.request.PostRequest('api/mbr/edit', {mbr: update_mbr}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('MBR updated successfully', 'Edit MBR',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.toastr.error(res.message, 'Edit MBR');
      }
      vm.isLoading = false;
    }, this.dialogRef);
  }
  createFrom(mbr) {
    this.mbrForm = this.formBuilder.group({
      MBR_NAME: [{value: mbr.MBR_NAME, disabled: true}],
      TELEPHONE: [mbr.TELEPHONE, Validators.compose([Validators.minLength(4), Validators.maxLength(15)])],
      FAX: [mbr.FAX, Validators.compose([Validators.minLength(4), Validators.maxLength(15)])],
      EMAIL: [mbr.EMAIL, Validators.email],
      MBR_VAT_ID: [mbr.MBR_VAT_ID, Validators.required],
      KERRIDGE_ACC_NO: [mbr.KERRIDGE_ACC_NO, Validators.required],
    });
  }
}
