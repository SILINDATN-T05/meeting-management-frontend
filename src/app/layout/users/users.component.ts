import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    NgModule,
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
import { MatMenuModule } from '@angular/material/menu';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { AddUserDialogComponent } from '../components/add-user-dialog/add-user-dialog.component';
import { AddUserRoleComponent } from '../components/add-user-role/add-user-role.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { EditUserInformationComponent } from '../components/edit-user-information/edit-user-information.component';
import { EditUsernameComponent } from '../components/edit-username/edit-username.component';
import { RemoveUserRoleComponent } from '../components/remove-user-role/remove-user-role.component';

@NgModule({
    imports: [MatMenuModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()],
})
export class UsersComponent implements AfterViewInit, OnInit {
    searchFormFilters = [
        { name: '#', field: 'index+1', filter: false },
        { name: 'First Name', field: 'firstName', filter: true },
        { name: 'Last Name', field: 'lastName', filter: true },
        { name: 'Username', field: 'username', filter: true },
        { name: 'Cell Number', field: 'msisdn', filter: true },
        { name: 'Branch', field: 'branch.name', filter: false },
        { name: 'Status', field: 'STATUS', filter: false },
        { name: '     ', field: '', filter: false },
    ];

    tableColumns = [
        'firstname',
        'lastname',
        'username',
        'msisdn',
        'branch',
        'status',
        'manage',
    ];

    users = [];
    user: IUser;
    Branches = [];

    isLoading = false;

    dataSource: MatTableDataSource<any>;
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
        private dialog: MatDialog,
        private request: RequestService,
        private pagerService: PagerService,
        public toastr:  ToastrService,
        vcr: ViewContainerRef,
    ) {

        this.dataSource = new MatTableDataSource <any>(this.users);
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.getBranches();
        this.GetUsers();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getBranches() {
        const vm = this;
        try {
            vm.Branches = JSON.parse(sessionStorage.getItem('branches'));
            if (vm.Branches.length === 0) {
                this.request.PostRequest('api/branch/list_all', {}, function(
                    res: ICredentials,
                ) {
                    if (res.code === '00') {
                        vm.Branches = res.data;
                    }
                });
            }
        } catch (e) {
            this.request.PostRequest('api/branch/list_all', {}, function(
                res: ICredentials,
            ) {
                if (res.code === '00') {
                    vm.Branches = res.data;
                }
            });
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    isLoggedUser(id) {
        return id === this.user._id;
    }

    GetUsers(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        _query['_id'] = {$nin: [vm.user._id]};
        vm._request.PostRequest(
            'api/user/list_all',
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
                        vm.toastr.warning('0 Matches found', 'NOTE');
                    } else {
                        vm.toastr.warning('No users found', 'NOTE');
                    }
                    vm.users = [];
                    vm.paginator.pageIndex = 0;
                    vm.paginator.pageSize = 5;
                }
                vm.isLoading = false;
                vm.filterProps.filterRequest = false;
            },
        );
    }

    AddUser() {
        this.dialog.open(AddUserDialogComponent, {});
    }

    ReissuePassword(user) {
        sessionStorage.setItem('title', 'Password Re-issue');
        sessionStorage.setItem(
            'message',
            'Reset Password for : ' + user.msisdn,
        );
        sessionStorage.setItem('action', 'password-reissue');
        sessionStorage.setItem('data', JSON.stringify(user));
        this.dialog.open(ConfirmDialogComponent, {});
    }

    EditInformation(update_user) {
        sessionStorage.setItem('update_user', JSON.stringify(update_user));
        this.dialog.open(EditUserInformationComponent, {});
    }

    AssignRole(update_user) {
        sessionStorage.setItem('update_user', JSON.stringify(update_user));
        this.dialog.open(AddUserRoleComponent, {});
    }

    InvokeRole(update_user) {
        sessionStorage.setItem('update_user', JSON.stringify(update_user));
        this.dialog.open(RemoveUserRoleComponent, {});
    }

    ChangeUsername(update_user) {
        sessionStorage.setItem('update_user', JSON.stringify(update_user));
        this.dialog.open(EditUsernameComponent, {});
    }

    DeactivateUser(update_user, i) {
        const vm = this;
        this.request.PostRequest(
            'api/user/deactivate',
            { update_user_id: update_user._id },
            function(res: ICredentials) {
                if (res.code === '00' && res.data) {
                    vm.dataSource.data[i] = res.data;
                    vm.toastr.success(
                        'User deactivated successfully',
                        'Deactivate User',
                    );
                } else {
                    vm.toastr.error(res.message, 'Deactivate User');
                }
            },
        );
    }

    ActivateUser(update_user, i) {
        const vm = this;
        this.request.PostRequest(
            'api/user/activate',
            { update_user_id: update_user._id },
            function(res: ICredentials) {
                if (res.code === '00' && res.data) {
                    vm.dataSource.data[i] = res.data;
                    vm.toastr.success(
                        'User activated successfully',
                        'Activate User',
                    );
                } else {
                    vm.toastr.error(res.message, 'Activate User');
                }
            },
        );
    }

    displayBranch(branch) {
        const found = _.findIndex(this.Branches, { _id: branch });
        return found >= 0 ? this.Branches[found].name : 'Not Found';
    }

    sendFilterRequest(filter: any) {
        this.filterProps.filterRequest = true;
        this.GetUsers(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.GetUsers();
    }
}
