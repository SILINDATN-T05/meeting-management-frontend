import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IAssessmentNotification } from '../../shared/interfaces/assessment.notification.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';

@Component({
    selector: 'app-assessment-notification',
    templateUrl: './assessment-notification.component.html',
    styleUrls: ['./assessment-notification.component.scss'],
    animations: [routerTransition()],
})
export class AssessmentNotificationComponent implements AfterViewInit, OnInit {
    tableColumns = [
        'SUBMISSION_DATE',
        'ASSESSMENT_ID',
        'ASSESSMENT',
        'REQUEST_CREATED',
        'MESSAGE_ID',
        'RETRY',
        'MAIL_RECEIVED',
    ];

    isLoading = false;
    user: IUser;
    braches = [];
    notifications = [];

    dataSource: MatTableDataSource<IAssessmentNotification>;
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
        private formBuilder: FormBuilder,
        private pagerService: PagerService,
        public toastr:  ToastrService,
        vcr: ViewContainerRef) {

            this.dataSource = new MatTableDataSource <IAssessmentNotification>(this.notifications);
    }

    ngOnInit() {
        this.GetNotification();
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.braches = JSON.parse(sessionStorage.getItem('branches'));
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

    GetNotification(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        this._request.PostRequest(
            'api/attachment/ass_not_list_all',
            { query: _query },
            function(res: ICredentials) {
                if (res.code === '00') {
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
                        vm.toastr.warning('No users found', 'NOTE');
                    }
                    vm.notifications = [];
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
        this.GetNotification(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.GetNotification();
    }
}
