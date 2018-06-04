import {
    animate,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AfterViewInit } from '@angular/core';
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
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IWORKPROVIDER } from '../../shared/interfaces/workprovider.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { VerificationDialogComponent } from '../components/verification-dialog/verification-dialog.component';

@Component({
    selector: 'app-insurer-management',
    templateUrl: './insurer-management.component.html',
    styleUrls: ['./insurer-management.component.scss'],
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
export class InsurerManagementComponent implements OnInit, AfterViewInit {

    tableColumns = [
        'K8_ACCOUNT_NO',
        'WORKPROVIDER_ID',
        'WORKPROVIDER_ABBR',
        'MANAGE',
    ];

    selectedMBR: IWORKPROVIDER;
    searchForm: FormGroup;
    searchData: object = {};
    isLoading = false;
    request_major_status = [];
    request_minor_status = [];

    dataSource = new MatTableDataSource<IWORKPROVIDER>([]);
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

    ngOnInit() {
        this.getWorkProviders();
        this.dataSource = new MatTableDataSource<IWORKPROVIDER>([]);
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

    getWorkProviders(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        vm._request.PostRequest(
            'api/work_provider/list_all/',
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
                        vm.toastr.warning('No Work Provider(s) found', 'NOTE');
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
        this.getWorkProviders(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getWorkProviders();
    }
}
