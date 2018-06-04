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
  selector: 'app-add-mbr-dialog',
  templateUrl: './add-mbr-dialog.component.html',
  styleUrls: ['./add-mbr-dialog.component.scss'],
  animations: [routerTransition()],
})
export class AddMbrDialogComponent implements OnInit {
  searchForm: FormGroup;
  mbr_details: any = {};
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
  address = {};
  category = new FormControl();
  type = new FormControl();
  menu = new FormControl();
  channel = new FormControl();
  userSettings: any = {
    showRecentSearch: true,
    showSearchButton: false,
    geoCountryRestriction: ['za'],
  };
  constructor(
      private formBuilder: FormBuilder,
      private request: RequestService,
      public toastr:  ToastrService,
      private router: Router,
      vcr: ViewContainerRef, public dialogRef: MatDialogRef<AddMbrDialogComponent>) {

    }

  ngOnInit() {
    this.createForm();
  }
  autoCompleteCallback1(selectedData: any) {
    const addr = selectedData.data.address_components;
    this.address['PROVINCE'] = addr[addr.length - 3].long_name;
    this.address['GPS_LAT'] = selectedData.data.geometry.location.lat;
    this.address['GPS_LONG'] = selectedData.data.geometry.location.lng;
    this.address['PostCode'] = addr[addr.length - 1].long_name;
    // tslint:disable-next-line:radix
    // console.log(Number.isInteger(parseInt(addr[0].long_name)), addr[0].long_name);
    // tslint:disable-next-line:radix
    if (Number.isInteger(parseInt(addr[0].long_name))) {
      this.address['ADDRESS_1'] = addr[0].long_name;
      this.address['ADDRESS_2'] = addr[1].long_name;
      this.address['ADDRESS_3'] = addr[2].long_name;
      this.address['ADDRESS_4'] = addr[3].long_name;
    } else {
      this.address['ADDRESS_1'] = null;
      this.address['ADDRESS_2'] = addr[0].long_name;
      this.address['ADDRESS_3'] = addr[1].long_name;
      this.address['ADDRESS_4'] = addr[2].long_name;
    }
    // console.log(selectedData, this.address);
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
  saveMbr() {
    this.isLoading = true;
    this.mbr_details = this.searchForm.value;
    this.mbr_details = _.merge(this.mbr_details, this.address);
    const vm = this;
    vm.request.PostRequest('api/mbr/create', {mbr: vm.mbr_details}, function(res: ICredentials) {
      if (res.code === '00') {
        vm.toastr.success('MBR created successfully', 'Add MBR',  {
          timeOut: 3000,
        });
        vm.dialogRef.close();
        vm.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
        vm.isLoading = false;
        vm.toastr.error(res.message, 'Add MBR');
      }
    }, this.dialogRef);
  }
  private createForm() {
    this.searchForm = this.formBuilder.group({
      MBR_NAME: ['', Validators.required],
      TELEPHONE: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(15)])],
      FAX: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(15)])],
      EMAIL: ['', Validators.email],
      MBR_VAT_ID: ['', Validators.required],
      KERRIDGE_ACC_NO: ['', Validators.required],
    });
  }

}
