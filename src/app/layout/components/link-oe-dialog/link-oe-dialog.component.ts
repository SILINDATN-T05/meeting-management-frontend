import { Component, OnInit,  ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IPart } from '../../../shared/interfaces/part.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-link-oe-dialog',
  templateUrl: './link-oe-dialog.component.html',
  styleUrls: ['./link-oe-dialog.component.scss'],
})
export class LinkOeDialogComponent implements OnInit {
    linkoeForm: FormGroup;
    copiedPart: IPart;
    searchData = {};
    constructor(
        private dialogRef: MatDialogRef <LinkOeDialogComponent>,
        private _request: RequestService,
        private formBuilder: FormBuilder,
        public toastr:  ToastrService,
        vcr: ViewContainerRef ) {
         }

  ngOnInit() {
      this.copiedPart = JSON.parse(sessionStorage.getItem('copiedPart'));
    //   console.log(this.copiedPart);
      this.createForm();
  }
  Close() {
      this.dialogRef.close();
  }
  private createForm() {
      this.linkoeForm = this.formBuilder.group({
          oe_number: ['', Validators.required],
          part_id: [this.copiedPart.PART_ID],
      });
  }

    linkOE() {
        const vm = this;
        const options = {
            query: {
                PART_ID: vm.copiedPart.PART_ID,
                OE_ARRAY: {$in: [vm.linkoeForm.value.oe_number]},
            },
        };
        vm._request.PostRequest('match/get_part_by_query/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data.length > 0) {
                vm.toastr.error('OE number already linked to current part', 'ERROR');
            } else {
                vm.linkoeForm.value.part_id = vm.copiedPart.PART_ID;
                vm._request.PostRequest('match/link_oe/', vm.linkoeForm.value, function( response: ICredentials) {
                    vm.searchData = {};
                    if (response.code === '00') {
                        vm.toastr.success('you have successfully linked OE number ' + vm.linkoeForm.value.oe_number + '.', 'NOTE');
                    } else {
                        vm.toastr.error(response.message, 'ERROR');
                    }
                });
            }
        });
    }

}
