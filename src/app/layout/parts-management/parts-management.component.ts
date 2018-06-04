import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit,  ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, PageEvent} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IPart } from '../../shared/interfaces/part.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { CopyPartDialogComponent } from '../components/copy-part-dialog/copy-part-dialog.component';
import { LinkOeDialogComponent } from '../components/link-oe-dialog/link-oe-dialog.component';
import { PartDescriptionDialogComponent } from '../components/part-description-dialog/part-description-dialog.component';
import { PartStandardDialogComponent } from '../components/part-standard-dialog/part-standard-dialog.component';
import { UnlinkOeDialogComponent } from '../components/unlink-oe-dialog/unlink-oe-dialog.component';
@NgModule({
    imports: [ MatMenuModule],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})

@Component({
  selector: 'app-parts-management',
  templateUrl: './parts-management.component.html',
  styleUrls: ['./parts-management.component.scss'],
  animations: [routerTransition()],
})

export class PartsManagementComponent implements OnInit {

    searchForm: FormGroup;
    copyForm: FormGroup;
    linkoeForm: FormGroup;
    partEditForm: FormGroup;
    partStandardForm: FormGroup;
    copiedPart: IPart;
    searchData: object = {};
    partStandardArray = [];
    data = {
        column: [
            {
            name: '#',
            field: 'index+1',
            filter: false,
            },
            {
                name: 'Part Id',
                field: 'PART_ID',
                filter: true,
            },
            {
                name: 'Part Standard',
                field: 'PART_STANDARD',
                filter: false,
            },
            {
                name: 'Part Description',
                field: 'PART_DESCRIPTION',
                filter: false,
            },
            {
                name: 'Pac Code',
                field: 'PAC_ID',
                filter: false,
            },
            {
                name: 'OE',
                field: 'OE_ARRAY',
                filter: true,
            },
            {
                name: 'Status',
                field: 'status',
                filter: false,
            },
            {
                name: '     ',
                field: '',
                filter: false,
            }],
        content: [],
        pager: {
            totalItems: 0,
            currentPage: 0,
            pageSize: 0,
            totalPages: 0,
            startPage: 0,
            endPage: 0,
            startIndex: 0,
            endIndex: 0,
            pages: [],
        },
        pageSize: [2, 4, 6, 8, 10],
        allContent: [],
    };
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
    pageSize = 2;
    pageSizeOptions = [2, 4, 6, 8, 10];
    isLoading = false;
    constructor(
        private _request: RequestService,
        private formBuilder: FormBuilder,
        public toastr:  ToastrService,
        vcr: ViewContainerRef,
        private pagerService: PagerService,
        private dialog: MatDialog) {
           }
    ngOnInit() {
        this.createForm();
        this.copiedPart = {
            PART_DESCRIPTION: '',
            OE_ARRAY: [],
            PART_STANDARD: '',
            PAC_ID: '',
        };
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
        this.setPageSize(1, this.pageSize);
        this.getPartStandards();
    }
    paginationEvent(event: PageEvent) {
        this.setPageSize(event.pageIndex + 1, event.pageSize);
    }
    setPageSize(page: number, size: number) {

        // get pager object from service
        this.data.pager = this.pagerService.getPager(this.data.allContent.length, page, size);
        // get current page of items
        this.data.content = this.data.allContent.slice(this.data.pager.startIndex, this.data.pager.endIndex + 1);
    }

    private createForm() {
        this.searchForm = this.formBuilder.group({
            searchBy: [''],
            searchValue: [''],
        });
        this.copyForm = this.formBuilder.group({
            PART_ID: ['', Validators.required],
            PART_DESCRIPTION: '',
            OE_ARRAY: [],
            PART_STANDARD: '',
        });
        this.linkoeForm = this.formBuilder.group({
            oe_number: ['', Validators.required],
            part_id: [''],
        });
        this.partEditForm = this.formBuilder.group({
            part_id: [''],
            part_description: ['', Validators.required],
        });
        this.partStandardForm = this.formBuilder.group({
            part_id: [''],
            part_standard: ['', Validators.required],
        });

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

    displayStandard(standard_id) {
        if (this.partStandardArray.length > 0) {
            const index = _.findIndex(this.partStandardArray, {ID: standard_id});
            return index >= 0 ? this.partStandardArray[index].PART_STANDARD : null;
        } else {
            return null;
        }
    }

    getPart() {
        const vm = this;
        vm.data.content = [];
        vm.data.allContent = [];
        vm.length = 0;
        if (this.searchForm.value.searchBy !== '' && this.searchForm.value.searchValue !== '') {
            vm.isLoading = true;
            if (this.searchForm.value.searchBy === 'PART_ID') {
                this.searchData[this.searchForm.value.searchBy] = this.searchForm.value.searchValue;
            } else {
                this.searchData[this.searchForm.value.searchBy] = {$in: [this.searchForm.value.searchValue]};
            }
            const options = {
            query: this.searchData,
        };
            this._request.PostRequest('match/get_part_by_query/', options, function(res: ICredentials) {
            vm.searchData = {};
            if (res.code === '00' && res.data.length > 0) {
                vm.data.allContent = res.data;
                vm.length = res.data.length;
                vm.setPageSize(1, vm.pageSize);
            } else if (res.code === '00') {
                vm.toastr.warning('No part(s) found', 'NOTE');
            } else {
                vm.toastr.error(res.message, 'ERROR');
            }
            vm.isLoading = false;
        });
        }
    }
    copyPart(part) {
        sessionStorage.setItem('copiedPart', JSON.stringify(part));
        this.dialog.open(CopyPartDialogComponent, {});
    }

    prepareLinkOE(part) {
        sessionStorage.setItem('copiedPart', JSON.stringify(part));
        this.dialog.open(LinkOeDialogComponent, {});
    }

    prepareUnlinkOE(part) {
        sessionStorage.setItem('copiedPart', JSON.stringify(part));
        this.dialog.open(UnlinkOeDialogComponent, {});
    }

    updatepartStandard(part) {
        sessionStorage.setItem('copiedPart', JSON.stringify(part));
        this.dialog.open(PartStandardDialogComponent, {});
    }

    updatepartDescription(part) {
        sessionStorage.setItem('copiedPart', JSON.stringify(part));
        this.dialog.open(PartDescriptionDialogComponent, {});
    }
}
