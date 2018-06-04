import { Component, OnInit,  ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IPart } from '../../../shared/interfaces/part.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-unlink-oe-dialog',
  templateUrl: './unlink-oe-dialog.component.html',
  styleUrls: ['./unlink-oe-dialog.component.scss'],
})
export class UnlinkOeDialogComponent implements OnInit {
    unlinkoeForm: FormGroup;
    copiedPart: IPart;
    searchData = {};
    constructor(
        private dialogRef: MatDialogRef<UnlinkOeDialogComponent>,
        private _request: RequestService,
        private formBuilder: FormBuilder,
        public toastr:  ToastrService,
        vcr: ViewContainerRef ) {
         }

  ngOnInit() {
      this.createForm();
      this.copiedPart = JSON.parse(sessionStorage.getItem('copiedPart'));
  }
  Close() {
      this.dialogRef.close();
  }
    private createForm() {
        this.unlinkoeForm = this.formBuilder.group({
            oe_number: ['', Validators.required],
            part_id: [''],
        });
    }

    unlinkOE() {
        const vm = this;
        const options = {
            query: {
                PART_ID: vm.copiedPart.PART_ID,
                OE_ARRAY: {$in: [vm.unlinkoeForm.value.oe_number]},
            },
        };
        vm._request.PostRequest('match/get_part_by_query/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data.length > 0) {
                vm.unlinkoeForm.value.part_id = vm.copiedPart.PART_ID;
                vm._request.PostRequest('match/unlink_oe/', vm.unlinkoeForm.value, function( response: ICredentials) {
                    vm.searchData = {};
                    if (response.code === '00') {
                        vm.toastr.success('You have successfully unlinked OE number ' + vm.unlinkoeForm.value.oe_number + '.', 'NOTE');
                    } else {
                        vm.toastr.error(response.message, 'ERROR');
                    }
                });
            } else {
                vm.toastr.error('OE number not linked to current part', 'ERROR');
            }
        });
    }

}
