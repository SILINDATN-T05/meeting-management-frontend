import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { FilterFormComponent } from '../../shared/custom/filter-form/filter-form.component';
import { IAssessment } from '../../shared/interfaces/assessment.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
    animations: [routerTransition()],
})
export class VerificationComponent implements AfterViewInit, OnInit {
    selectedAssessment: IAssessment;
    request_major_status = [];
    request_minor_status = [];
    assesments = [];
    showFirstLastButtons = true;

    displayedColumns = [
        'REQUEST_ID',
        'ASSESSMENT_ID',
        'VIN',
        'REGISTRATION',
        'WORKPROVIDER_ID',
        'CLAIM_NO',
        'UNDER_WARRANTY',
        'CREATE_DATE',
        'PROCESSED_BY',
    ];

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
        public toastr:  ToastrService,
        vcr: ViewContainerRef,
        private router: Router,
        private pagerService: PagerService,
        private dialog: MatDialog,
    ) {
        this.dataSource = new MatTableDataSource <IAssessment>(this.assesments);
    }

    ngOnInit() {
        this.getUnverifiedAssessments();
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

    populateAssessment(assessment) {
        const vm =  this;
        // vm._request.PostAttatchmentRequest('attachment/fetch_attachments', {messageId: assessment.MESSAGE_ID});
        vm._request.PostRequest('api/assessment/assign', {query: {REQUEST_ID: assessment.REQUEST_ID}}, function(res: ICredentials) {
            if (res.code === '00') {
                sessionStorage.setItem('selectedAssessment', JSON.stringify(res.data));
                vm.router.navigate(['/confirm-matched'], { replaceUrl: true });
            } else {
                vm.toastr.error('Technical error has occured. please contact system administrator', 'NOTE');
            }
        });
    }

    getUnverifiedAssessments(_query: object = {}) {
        const vm = this;
        this._request.PostRequest(
            'api/assessment/unverified',
            { query: _query },
            (res: ICredentials) => {
                if (res.code === '00' && res.data.length > 0) {
                    vm.assesments = res.data;
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
                            'No Unverified assessments(s) found',
                            'NOTE',
                        );
                    }
                    vm.assesments = null;
                    vm.paginator.length = res.data.length;
                }
                vm.filterProps.filterRequest = false;
            },
        );
    }

    sendFilterRequest(filter: any) {
        this.filterProps.filterRequest = true;
        this.getUnverifiedAssessments(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getUnverifiedAssessments();
    }
}
