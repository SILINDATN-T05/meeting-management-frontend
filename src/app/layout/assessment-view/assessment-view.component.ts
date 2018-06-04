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
} from '@angular/material';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { IAuthorizationPart } from '../../shared/interfaces/authorization_part.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { IWORKPROVIDER } from '../../shared/interfaces/workprovider.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';

@Component({
    selector: 'app-assessment-view',
    templateUrl: './assessment-view.component.html',
    styleUrls: ['./assessment-view.component.scss'],
    animations: [routerTransition()],
})
export class AssessmentViewComponent implements AfterViewInit, OnInit {
    tableColumns = [
        'CREATE_DATE',
        'ASSESSMENT_ID',
        'POLICY_NO',
        'CLAIM_NO',
        'REGISTRATION',
        'MAJOR_STATUS_ID',
        'COMMENTS',
    ];

    WorkProvider: IWORKPROVIDER;
    isLoading = false;
    selected = '';
    insurerList: IWORKPROVIDER[];
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
        filterRequest : false,
        showFilterClearButton: false,
    };

    constructor(
        private _request: RequestService,
        public toastr: ToastrService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {
        this.dataSource = new MatTableDataSource<IAssessment>(
            this.selectedAssessment,
        );
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.Permissions = JSON.parse(sessionStorage.getItem('permissions'));
        this.request_major_status = JSON.parse(
            sessionStorage.getItem('request_major_status'),
        );
        this.request_minor_status = JSON.parse(
            sessionStorage.getItem('request_minor_status'),
        );
        this.getWorkProvider();
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

    displayStatus(id) {
        const found = _.findIndex(this.request_major_status, {
            MAJOR_STATUS_ID: id,
        });
        return found >= 0
            ? this.request_major_status[found].MAJOR_STATUS_DESCRIPTION
            : 'Un Disclosed';
    }

    getWorkProvider() {
        const vm = this;
        vm.isLoading = true;
        if (vm.user.insurer) {
            vm._request.PostRequest(
                'api/work_provider/list_all',
                { query: { _id: vm.user.insurer } },
                function(res: ICredentials) {
                    vm.isLoading = false;
                    if (res.code === '00') {
                        vm.WorkProvider = res.data[0];
                        vm.getAssessments();
                    }
                },
            );
        } else {
            vm._request.PostRequest(
                'api/work_provider/list_all',
                { query: { _id: vm.user.insurer } },
                function(res: ICredentials) {
                    vm.isLoading = false;
                    if (res.code === '00') {
                        vm.insurerList = res.data;
                    }
                },
            );
        }
    }
    checkPermission(permission) {
        const found = _.findIndex(this.Permissions, {code: permission});
        return found > 0;
    }

    matchedDataSource(parts) {
        return new MatTableDataSource<IAuthorizationPart>(parts);
    }
    onChange(event) {
        if (this.selected !== '' && this.selected !== undefined) {
            this.getAssessments();
        }
    }

    getAssessments(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        if (vm.selected !== '' || vm.selected !== undefined) {
            _query['WORKPROVIDER_ABBR'] = vm.selected;
        } else {
            _query['WORKPROVIDER_ABBR'] = vm.WorkProvider.WORKPROVIDER_ABBR;
        }
        vm._request.PostRequest(
            'api/assessment/universal',
            { query: _query, options: {skip: 0, limit: 50 } },
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
                        vm.toastr.warning('No Authorised assessments(s) found', 'NOTE');
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
        this.getAssessments(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getAssessments();
    }
}
