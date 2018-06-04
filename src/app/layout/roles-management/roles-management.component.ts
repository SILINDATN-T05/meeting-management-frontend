import {
    AfterViewInit,
    ChangeDetectorRef,
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
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { AddRoleDialogComponent } from '../components/add-role-dialog/add-role-dialog.component';
import { AddRolePermisionDialogComponent } from '../components/add-role-permision-dialog/add-role-permision-dialog.component';
import { EditRoleDialogComponent } from '../components/edit-role-dialog/edit-role-dialog.component';
import { RemoveRolePermisionDialogComponent } from '../components/remove-role-permision-dialog/remove-role-permision-dialog.component';

@Component({
    selector: 'app-roles-management',
    templateUrl: './roles-management.component.html',
    styleUrls: ['./roles-management.component.scss'],
    animations: [routerTransition()],
})
export class RolesManagementComponent implements AfterViewInit, OnInit {
    searchFormFilters = [
        { name: 'Name', field: 'name', filter: true },
        { name: 'System', field: 'organizationID', filter: true },
        { name: 'Description', field: 'description', filter: false },
        { name: 'Manage', field: '', filter: false },
    ];

    tableColumns = ['name', 'organizationID', 'description', 'manage'];

    isLoading = false;
    roles = [];

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
        public toastr:  ToastrService,
        vcr: ViewContainerRef,
        private formBuilder: FormBuilder,
        private pagerService: PagerService,
        private dialog: MatDialog,
    ) {

        this.dataSource = new MatTableDataSource <any>(this.roles);
    }

    ngOnInit() {
        this.getRoles();
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

    AddRole() {
        this.dialog.open(AddRoleDialogComponent, {});
    }

    EditInformation(role) {
        sessionStorage.setItem('selectedRole', JSON.stringify(role));
        this.dialog.open(EditRoleDialogComponent, {});
    }

    AddPermission(role) {
        sessionStorage.setItem('selectedRole', JSON.stringify(role));
        this.dialog.open(AddRolePermisionDialogComponent, {});
    }

    RemovePermission(role) {
        sessionStorage.setItem('selectedRole', JSON.stringify(role));
        this.dialog.open(RemoveRolePermisionDialogComponent, {});
    }

    getRoles(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        vm._request.PostRequest(
            'api/role/list_all',
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
                        vm.toastr.warning('No system(s) roles found', 'NOTE');
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
        this.getRoles(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getRoles();
    }
}
