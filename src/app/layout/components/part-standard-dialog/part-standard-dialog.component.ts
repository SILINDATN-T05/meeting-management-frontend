import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IPart } from '../../../shared/interfaces/part.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import {RequestService} from '../../../shared/services/request.service';

@Component({
  selector: 'app-part-standard-dialog',
  templateUrl: './part-standard-dialog.component.html',
  styleUrls: ['./part-standard-dialog.component.scss'],
})
export class PartStandardDialogComponent implements OnInit {
    partStandardForm: FormGroup;
    copiedPart: IPart;
    searchData: object = {};
    partStandardArray = [];

    constructor(
        private dialogRef: MatDialogRef <PartStandardDialogComponent>,
        private _request: RequestService,
        private formBuilder: FormBuilder,
        public toastr:  ToastrService,
        vcr: ViewContainerRef ) {

    }

    private createForm() {
            this.partStandardForm = this.formBuilder.group({
                part_id: [''],
                part_standard: ['', Validators.required],
            });
    }

  ngOnInit() {
      this.createForm();
      this.copiedPart = JSON.parse(sessionStorage.getItem('copiedPart'));
      this.partStandardArray = JSON.parse(sessionStorage.getItem('standard'));
      this.getPartStandards();
  }
  Close() {
      this.dialogRef.close();
  }
        getPartStandards() {
            const vm = this;
            const options = {
                query: {},
            };
            vm._request.PostRequest('match/get_part_standard_by_query/', options, function(res: ICredentials) {
                if (res.code === '00' && res.data.length > 0) {
                    vm.partStandardArray = res.data;
                    sessionStorage.setItem('standard', JSON.stringify(res.data));
                } else if (res.code === '06') {
                    vm.toastr.warning('No part standard(s) found', 'NOTE');
                }
            });
        }

    updatePartStandard() {
        const vm = this;
        const options = {
            query: {
                PART_ID: vm.copiedPart.PART_ID,
            },
        };
        vm._request.PostRequest('match/get_part_by_query/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data.length > 0) {
                vm.partStandardForm.value.part_id = vm.copiedPart.PART_ID;
                vm._request.PostRequest('match/update_part_standard/', vm.partStandardForm.value, function( response: ICredentials) {
                    vm.searchData = {};
                    if (response.code === '00') {
                        vm.toastr.success('you have successfully updated part standard for Part ID : ' + vm.partStandardForm.value.part_id + '.', 'NOTE');
                    } else {
                        vm.toastr.error(response.message, 'ERROR');
                    }
                });
            } else {
                vm.toastr.error('Unable to update part standard', 'ERROR');
            }
        });
    }

}
