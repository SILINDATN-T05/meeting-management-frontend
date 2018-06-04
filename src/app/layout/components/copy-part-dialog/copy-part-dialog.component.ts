import { Component, OnInit,  ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, PageEvent} from '@angular/material';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../../router.animations';
import { IPart } from '../../../shared/interfaces/part.interface';
import { ICredentials } from '../../../shared/interfaces/response.interface';
import { PagerService } from '../../../shared/services/pager.service';
import { RequestService } from '../../../shared/services/request.service';

@Component({
  selector: 'app-copy-part-dialog',
  templateUrl: './copy-part-dialog.component.html',
  styleUrls: ['./copy-part-dialog.component.scss'],
  animations: [routerTransition()],
})
export class CopyPartDialogComponent implements OnInit {
    copyForm: FormGroup;
    copiedPart: IPart;
    searchData: object = {};
    partStandardArray = [];
    pager: {
      totalItems: number,
      currentPage: number,
      pageSize: number,
      totalPages: number,
      startPage: number,
      endPage: number,
      startIndex: number,
      endIndex: number,
      pages: number[],
    };
    pagedContent: string[];
    length = 0;
    pageSize = 5;
    pageSizeOptions = [5, 10];
  constructor(
      private dialogRef: MatDialogRef <CopyPartDialogComponent>,
      private _request: RequestService,
      private formBuilder: FormBuilder,
      public toastr:  ToastrService,
      vcr: ViewContainerRef,
      private pagerService: PagerService) {
         }

  ngOnInit() {
    this.createForm();
    this.copiedPart = JSON.parse(sessionStorage.getItem('copiedPart'));
    this.partStandardArray = JSON.parse(sessionStorage.getItem('standard'));
    this.pager = {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 0,
        pages: [],
    };
    this.pagedContent = [];
    this.length = this.copiedPart.OE_ARRAY.length;
    this.setDialogPageSize(1, this.pageSize);
  }

  paginationEvent(event: PageEvent) {
    this.setDialogPageSize(event.pageIndex + 1, event.pageSize);
    }
  private createForm() {
    this.copyForm = this.formBuilder.group({
        PART_ID: ['', Validators.required],
        PART_DESCRIPTION: '',
        OE_ARRAY: [],
        PART_STANDARD: '',
    });
}
  displayStandard(standard_id) {
    if (this.partStandardArray.length > 0) {
        const index = _.findIndex(this.partStandardArray, {ID: standard_id});
        return index >= 0 ? this.partStandardArray[index].PART_STANDARD : null;
    } else {
        return null;
    }
}
setDialogPageSize(page: number, size: number) {

    // get pager object from service
    this.pager = this.pagerService.getPager(this.copiedPart.OE_ARRAY.length, page, size);
    // get current page of items
    this.pagedContent = this.copiedPart.OE_ARRAY.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
  savePart() {
      const vm = this;
      const options = {
          query: {
              PART_ID: vm.copyForm.value.PART_ID,
          },
      };
      vm._request.PostRequest('match/get_part_by_query/', options, function(res: ICredentials) {
          vm.searchData = {};
          if (res.code === '00' && res.data.length > 0) {
              vm.toastr.error('part ID used already exist', 'ERROR');
          } else {
              vm.copyForm.value.PART_DESCRIPTION = vm.copiedPart.PART_DESCRIPTION;
              vm.copyForm.value.PART_STANDARD = vm.copiedPart.PART_STANDARD;
              vm.copyForm.value.OE_ARRAY = vm.copiedPart.OE_ARRAY;
              vm._request.PostRequest('match/add_part/', vm.copyForm.value, function( response: ICredentials) {
                  vm.searchData = {};
                  if (response.code === '00') {
                      vm.toastr.success('you have successfully added part id ' + vm.copyForm.value.PART_ID + '.', 'NOTE');
                  } else {
                      vm.toastr.error(response.message, 'ERROR');
                  }
              });
                  }
              });
  }
  Close() {
    this.dialogRef.close();
  }
}
