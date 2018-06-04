import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    MatDialog,
    MatPaginator,
    MatSort,
    MatTableDataSource,
    PageEvent,
} from '@angular/material';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { IAuthorizationPart } from '../../shared/interfaces/authorization_part.interface';
import { IMBR } from '../../shared/interfaces/mbr.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { AddMbrDialogComponent } from '../components/add-mbr-dialog/add-mbr-dialog.component';
import { EditMbrDialogComponent } from '../components/edit-mbr-dialog/edit-mbr-dialog.component';
import { VerificationDialogComponent } from '../components/verification-dialog/verification-dialog.component';

@Component({
    selector: 'app-mbr-management',
    templateUrl: './mbr-management.component.html',
    styleUrls: ['./mbr-management.component.scss'],
    animations: [
        trigger('detailExpand', [
            state(
                'collapsed',
                style({ height: '0px', minHeight: '0', visibility: 'hidden' }),
            ),
            state('expanded', style({ height: '*', visibility: 'visible' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
            ),
        ]),
        routerTransition(),
    ],
})
export class MbrManagementComponent implements AfterViewInit, OnInit {

    tableColumns = [
        'KEY',
        'MBR_NAME',
        'TELEPHONE',
        'FAX',
        'EMAIL',
        'MBR_VAT_ID',
        'KERRIDGE_ACC_NO',
        'MANAGE',
    ];

    subTableColumns = [
        'WORKPROVIDER_ARRAY',
    ];

    selectedMBR: IMBR;
    searchForm: FormGroup;
    searchData: object = {};
    isLoading = false;
    request_major_status = [];
    request_minor_status = [];

    dataSource = new MatTableDataSource<IMBR>([]);
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    menuFormInputValue = '';
    menuFormfilterBtnEnable = true;
    filterProps = {
        filterRequest : false,
        showFilterClearButton: false,
    };

    constructor(
        private _request: RequestService,
        public toastr: ToastrService,
        vcr: ViewContainerRef,
        private formBuilder: FormBuilder,
        private pagerService: PagerService,
        private dialog: MatDialog,
    ) {}

    isExpansionDetailRow = (i, row) => row.hasOwnProperty('detailRow');
    // tslint:disable-next-line:member-ordering
    expandedElement: any;

    ngOnInit() {
        this.getMbrs();
        this.dataSource = new MatTableDataSource<IMBR>([]);
        this.request_major_status = JSON.parse(
            sessionStorage.getItem('request_major_status'),
        );
        this.request_minor_status = JSON.parse(
            sessionStorage.getItem('request_minor_status'),
        );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    matchedDataSource(work_provider_array) {
        return new MatTableDataSource<string>(work_provider_array);
    }

    EditInformation(mbr) {
        sessionStorage.setItem('update_mbr', JSON.stringify(mbr));
        this.dialog.open(EditMbrDialogComponent, {});
    }

    addMbr() {
        this.dialog.open(AddMbrDialogComponent, {});
    }

    getMbrs(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        vm._request.PostRequest(
            'api/mbr/list_all/',
            { query: _query },
            function(res: ICredentials) {
                if (res.code === '00' && res.data.length > 0) {
                    vm.dataSource.data = res.data;
                    vm.paginator.length = res.data.length;
                    vm.paginator.pageIndex = 0;
                    vm.paginator.pageSize = 5;
                    if (vm.filterProps.filterRequest) {
                        vm.filterProps.showFilterClearButton = true;
                    }
                } else {
                    if (vm.filterProps.filterRequest) {
                        vm.toastr.warning(
                            '0 Matches found',
                            'NOTE',
                        );
                    } else {
                        vm.toastr.warning('No MBR(s) found', 'NOTE');
                    }
                    vm.paginator.pageIndex = 0;
                    vm.paginator.pageSize = 5;
                }
                vm.isLoading = false;
                vm.filterProps.filterRequest = false;
            },
        );
    }

    sendFilterRequest(filter: any) {
        this.filterProps.filterRequest = true;
        this.getMbrs(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getMbrs();
    }
}
