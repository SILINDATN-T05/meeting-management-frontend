import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IPart } from '../../../shared/interfaces/part.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import {RequestService} from '../../../shared/services/request.service';

@Component({
  selector: 'app-part-description-dialog',
  templateUrl: './part-description-dialog.component.html',
  styleUrls: ['./part-description-dialog.component.scss'],
})
export class PartDescriptionDialogComponent implements OnInit {
    partEditForm: FormGroup;
    copiedPart: IPart;
    searchData: object = {};
    constructor(
        private dialogRef: MatDialogRef <PartDescriptionDialogComponent>,
        private _request: RequestService,
        private formBuilder: FormBuilder,
        public toastr:  ToastrService,
        vcr: ViewContainerRef ) {
         }

  ngOnInit() {
      this.copiedPart = JSON.parse(sessionStorage.getItem('copiedPart'));
      this.createForm(this.copiedPart.PART_DESCRIPTION);
  }
  Close() {
      this.dialogRef.close();
  }
    private createForm(description) {
        this.partEditForm = this.formBuilder.group({
            part_id: [''],
            part_description: [description, Validators.required],
        });
    }

    updatePartDescription() {
        const vm = this;
        const options = {
            query: {
                PART_ID: vm.copiedPart.PART_ID,
            },
        };
        vm._request.PostRequest('match/get_part_by_query/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data.length > 0) {
                vm.partEditForm.value.part_id = vm.copiedPart.PART_ID;
                vm._request.PostRequest('match/update_part_description/', vm.partEditForm.value, function( response: ICredentials) {
                    vm.searchData = {};
                    if (response.code === '00') {
                        vm.toastr.success('you have successfully updated part description for part number ' + vm.partEditForm.value.part_id + '.', 'NOTE');
                    } else {
                        vm.toastr.error(response.message, 'ERROR');
                    }
                });
            } else {
                vm.toastr.error('Unable to update part description', 'ERROR');
            }
        });
    }

}
