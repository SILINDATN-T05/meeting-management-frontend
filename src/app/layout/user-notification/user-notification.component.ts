import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { IUserNotification } from '../../shared/interfaces/user.notification.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';

@Component({
    selector: 'app-user-notification',
    templateUrl: './user-notification.component.html',
    styleUrls: ['./user-notification.component.scss'],
    animations: [routerTransition()],
})
export class UserNotificationComponent implements OnInit {
  searchForm: FormGroup;
  searchData: object = {};
  isLoading = false;
  user: IUser;
  displayUser: IUser;
  users = [];

  Branches = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  menuFormInputValue = '';
  menuFormfilterBtnEnable = true;
  filterProps = {
      filterRequest : false,
      showFilterClearButton: false,
  };
  tableColumns = [
    'msisdn',
    'message',
];
  dataSource = new MatTableDataSource<IUserNotification>([]);

  constructor(
    private _request: RequestService,
    private formBuilder: FormBuilder,
    private pagerService: PagerService,
    public toastr: ToastrService,
    vcr: ViewContainerRef,
) {
    this.dataSource = new MatTableDataSource <IUserNotification>(this.users);
}
ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.Branches = JSON.parse(sessionStorage.getItem('branches'));
    this.GetNotification();
}
    displayName(id) {
        const vm = this;
        const options = {
            query: { _id: id },
        };
        this._request.PostRequest('api/user/list_all', options, function(
            res: ICredentials,
        ) {
            if (res.code === '00') {
                vm.displayUser = res.data[0];
                return (
                    vm.displayUser.firstName + '  ' + vm.displayUser.lastName
                );
            } else {
                return 'user not found';
            }
        });
    }

    GetNotification(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        this._request.PostRequest(
            'api/attachment/not_list_all',
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
                        vm.toastr.warning(
                            '0 Matches found',
                            'NOTE',
                        );
                    } else {
                        vm.toastr.warning('No users found', 'NOTE');
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
        this.GetNotification(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.GetNotification();
    }
}
