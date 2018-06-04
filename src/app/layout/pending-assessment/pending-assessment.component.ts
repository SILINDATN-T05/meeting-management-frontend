import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
// import { CdkDetailRowModule } from '../../shared/directives/cdk-detail-row.module';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { IAuthorizationPart } from '../../shared/interfaces/authorization_part.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { VerificationDialogComponent } from '../components/verification-dialog/verification-dialog.component';

@Component({
    selector: 'app-pending-assessment',
    templateUrl: './pending-assessment.component.html',
    styleUrls: ['./pending-assessment.component.scss'],
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
export class PendingAssessmentComponent implements AfterViewInit, OnInit {
    searchFormFilters = [
        { name: 'Request ID', field: 'REQUEST_ID', filter: true },
        { name: 'Assessment ID', field: 'ASSESSMENT_ID', filter: true },
        { name: 'VIN', field: 'VIN', filter: true },
        { name: 'Registration', field: 'REGISTRATION', filter: true },
        { name: 'Work Provider', field: 'WORKPROVIDER_ID', filter: false },
        { name: 'Claim No', field: 'CLAIM_NO', filter: false },
        { name: 'MBR ID', field: 'MBR_ID', filter: true },
        { name: 'Under Warranty', field: 'UNDER_WARRANTY', filter: true },
        { name: 'Outlet ID', field: 'OUTLET_ID', filter: true },
        { name: 'Create Date', field: 'CREATE_DATE', filter: false },
    ];

    tableColumns = [
        'REQUEST_ID',
        'ASSESSMENT_ID',
        'VIN',
        'REGISTRATION',
        'WORKPROVIDER_ID',
        'CLAIM_NO',
        // 'MBR_ID',
        'UNDER_WARRANTY',
        // 'OUTLET_ID',
        'CREATE_DATE',
    ];

    subTableColumns = [
        'MATCHED_PART',
        'PART_DESCRIPTION',
        'MATCHED_PART_ID',
        'AUDA_PART_ID',
        'BID_SUBMIT',
        'BID_SUBMIT_DATE',
    ];

    searchForm: FormGroup;
    searchData: object = {};
    isLoading = false;
    request_major_status = [];
    request_minor_status = [];
    selectedAssessment = [];

    dataSource: MatTableDataSource<IAssessment>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    menuFormInputValue = '';
    menuFormfilterBtnEnable = true;
    filterProps = {
        filterRequest: false,
        showFilterClearButton: false,
    };

    constructor(
        private _request: RequestService,
        public toastr:  ToastrService,
        vcr: ViewContainerRef,
        private formBuilder: FormBuilder,
        private pagerService: PagerService,
        private dialog: MatDialog,
    ) {

        this.dataSource = new MatTableDataSource <IAssessment>(this.selectedAssessment);
    }

    ngOnInit() {
        this.getPendingAssessments();
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

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    matchedDataSource(parts) {
        return new MatTableDataSource<IAuthorizationPart>(parts);
    }

    populateAssessment(assessment) {
        sessionStorage.setItem(
            'selectedAssessment',
            JSON.stringify(assessment),
        );
        this.dialog.open(VerificationDialogComponent, {});
    }

    getPendingAssessments(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        vm._request.PostRequest(
            'api/assessment/pending',
            { query: _query , options: {skip: 0, limit: 50 }},
            function(res: ICredentials) {
                vm.searchData = {};
                vm.isLoading = false;
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
                        vm.toastr.warning(
                            'No Pending assessments(s) found',
                            'NOTE',
                        );
                    }
                    vm.selectedAssessment = [];
                    vm.paginator.pageIndex = 0;
                    vm.paginator.pageSize = 5;
                }
                vm.filterProps.filterRequest = false;
            },
        );
    }

    sendFilterRequest(filter: any) {
        this.filterProps.filterRequest = true;
        this.getPendingAssessments(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getPendingAssessments();
    }
}
