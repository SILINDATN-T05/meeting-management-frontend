import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-add-meeting-dialog',
  templateUrl: './add-meeting-dialog.component.html',
  styleUrls: ['./add-meeting-dialog.component.scss'],
  animations: [routerTransition()],
})
export class AddMeetingDialogComponent implements OnInit {
  user: any = {};
  Roles: any = [];
  isSelectedBranch = false;
  isRoleSelected = false;
  isCompleted = false;
  selectedRoles: any = [];
  user_details: any = {};
  Branches: any = [];
  selectedBranch: any = {};
  searchForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private request: RequestService,
    public toastr:  ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<AddMeetingDialogComponent>) {

  }

  ngOnInit() {
    this.createForm();
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
  parseData(data) {
    this.user = JSON.parse(data);
  }
  Close() {
    this.dialogRef.close();
  }
  onSubmit() {
    const vm = this;
    this.request.PostRequest('meetingtype/create', this.searchForm.value, function(res: ICredentials) {
      console.log(res);
      if (res.code === '00') {
          alert('user created successfully');
      } else {
        alert(res.message);
      }
    });
    this.isCompleted = true;
    console.log(this.user_details);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    abbr: ['', Validators.required],
    });
  }

}
