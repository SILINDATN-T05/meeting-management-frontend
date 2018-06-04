import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import {routerTransition} from '../../../router.animations';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-edit-permision-dialog',
  templateUrl: './edit-permision-dialog.component.html',
  styleUrls: ['./edit-permision-dialog.component.scss'],
  animations: [routerTransition()],
})
export class EditPermisionDialogComponent implements OnInit {
  searchForm: FormGroup;
  permission_details: any = [];
  permission: any = {};
  isLoading = false;
  isChanged = false;
  options = {
      query: {},
      config_name: [
        'MENU_TYPES',
        'MENU_CATAGORIES',
        'MENU_LIST',
        'SYSTEM_CHANNELS',
      ],
    };
  Category = [];
  Type = [];
  Menu = [];
  Channel = [];
  type = new FormControl();
  menu = new FormControl();
  channel = new FormControl();
  constructor(
      private formBuilder: FormBuilder,
      private request: RequestService,
      public toastr:  ToastrService,
      private router: Router,
      vcr: ViewContainerRef, public dialogRef: MatDialogRef<EditPermisionDialogComponent>) {
    }

  ngOnInit() {
    this.permission = JSON.parse(sessionStorage.getItem('permission'));
    this.permission_details = _.values(this.permission);
    this.createForm(this.permission);
    this.getConfig();
  }
  Close() {
    this.dialogRef.close();
  }
  onChange() {
    this.isChanged = true;
  }
  getConfig() {
    const vm = this;
    vm.request.PostRequest('api/user/list_config', this.options, function(res: ICredentials) {
        if (res.code === '00' && res.data) {
            vm.Category = res.data.MENU_CATAGORIES;
            vm.Type = res.data.MENU_TYPES;
            vm.Menu = res.data.MENU_LIST;
            vm.Channel = res.data.SYSTEM_CHANNELS;
        } else {
            vm.toastr.warning('No Configs(s) found', 'NOTE');
        }
    }, this.dialogRef);
  }
  savePermission() {
    const vm = this;
    const diff = _.difference(vm.permission_details, _.values(vm.permission));
    if (diff.length > 0) {
      vm.isLoading = true;
      vm.request.PostRequest('api/permission/edit', {permission: vm.permission}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('permission updated successfully', 'Edit Permission',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.isLoading = false;
        vm.toastr.error(res.message, 'Edit Permission');
      }
    }, vm.dialogRef);
    } else {
      vm.toastr.warning('No Change has been detected so action is withheld', 'Add Permission');
    }
  }
  private createForm(perm) {
    this.searchForm = this.formBuilder.group({
      code: [{value: perm.code, disabled: true}, Validators.required],
    });
  }

}
