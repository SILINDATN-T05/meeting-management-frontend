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
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { IAuthorizationPart } from '../../shared/interfaces/authorization_part.interface';
import { IBranch } from '../../shared/interfaces/branch.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { VerificationDialogComponent } from '../components/verification-dialog/verification-dialog.component';

@Component({
    selector: 'app-authorised-assessment',
    templateUrl: './authorised-assessment.component.html',
    styleUrls: ['./authorised-assessment.component.scss'],
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
export class AuthorisedAssessmentComponent implements AfterViewInit, OnInit {
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
        // 'REQUEST_ID',
        'ASSESSMENT_ID',
        'REPAIR_START',
        'WORKPROVIDER_ID',
        'CLAIM_NO',
        'UNDER_WARRANTY',
        'CREATE_DATE',
        'MBR_NAME',
        'TELEPHONE',
        'CSC',
    ];

    subTableColumns = [
        'PART_ID',
        'PART_DESCRIPTION',
        'PART_PRICE',
        'AUDA_PART_ID',
        'WORKPROVIDER_AUTHORISED',
        'AUTHORISED_DATE',
        'WORKPROVIDER_APPROVED',
        'APPROVED_DATE',
    ];

    isLoading = false;
    request_major_status = [];
    request_minor_status = [];
    selectedAssessment = [];
    user: IUser;
    Permissions = [];

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
        private router: Router,
        private formBuilder: FormBuilder,
        private pagerService: PagerService,
        private dialog: MatDialog,
    ) {

        this.dataSource = new MatTableDataSource <IAssessment>(this.selectedAssessment);
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.Permissions = JSON.parse(sessionStorage.getItem('permissions'));
        this.getAuthorisedAssessments();
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
        const vm =  this;
        if (this.user.branch === '59f300cd8a80ed1980a4e19b') {
            sessionStorage.setItem('authorisedAssessment', JSON.stringify(assessment));
            vm.router.navigate(['/authorised-view'], { replaceUrl: true });
        } else {
        // vm._request.PostAttatchmentRequest('attachment/fetch_attachments', {messageId: assessment.MESSAGE_ID});
        vm._request.PostRequest('api/assessment/assigncsc', {query: {REQUEST_ID: assessment.REQUEST_ID}}, function(res: ICredentials) {
            if (res.code === '00') {
                const temp = res.data;
                temp['PARTS'] = assessment.PARTS;
                sessionStorage.setItem('authorisedAssessment', JSON.stringify(temp));
                vm.router.navigate(['/authorised-view'], { replaceUrl: true });
            } else {
                vm.toastr.error('Technical error has occured. please contact system administrator', 'NOTE');
            }
        });
    }
    }

    getAuthorisedAssessments(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        const found = _.findIndex(this.Permissions, {
            code: 'UM_URL_VIEW_AUTHORISED',
        });

        _query['MAJOR_STATUS_ID'] = 7;
        if (found === -1) {
            _query['OUTLET_ID'] = this.user.branch;
        }
        vm._request.PostRequest(
            'api/assessment/authorised',
            { query: _query, options: {skip: 0, limit: 50 } },
            function(res: ICredentials) {
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
                        vm.toastr.warning('0 Matches found', 'NOTE');
                    } else {
                        vm.toastr.warning(
                            'No Authorised assessments(s) found',
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
        this.getAuthorisedAssessments(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getAuthorisedAssessments();
    }
}
