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
  selector: 'app-add-permision-dialog',
  templateUrl: './add-permision-dialog.component.html',
  styleUrls: ['./add-permision-dialog.component.scss'],
  animations: [routerTransition()],
})
export class AddPermisionDialogComponent implements OnInit {
  searchForm: FormGroup;
  permission_details: any = {};
  isLoading = false;
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

  category = new FormControl();
  type = new FormControl();
  menu = new FormControl();
  channel = new FormControl();
  constructor(
      private formBuilder: FormBuilder,
      private request: RequestService,
      public toastr:  ToastrService,
      private router: Router,
      vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddPermisionDialogComponent>) {

    }

  ngOnInit() {
    this.createForm();
    this.getConfig();
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
  Close() {
    this.dialogRef.close();
  }
  savePermission() {
    this.isLoading = true;
    this.permission_details = this.searchForm.value;
    this.permission_details.code = this.permission_details.code.replace(/\s/g, '_').toUpperCase();
    this.permission_details['category'] = this.category.value;
    this.permission_details['type'] = this.type.value;
    this.permission_details['menu'] = this.menu.value;
    this.permission_details['channel'] = this.channel.value;
    const vm = this;
    this.request.PostRequest('api/permission/create', {permission: this.permission_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('permission created successfully', 'Add Permission',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.isLoading = false;
        vm.toastr.error(res.message, 'Add Permission');
      }
    }, this.dialogRef);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
      code: ['', Validators.required],
    });
  }
}
