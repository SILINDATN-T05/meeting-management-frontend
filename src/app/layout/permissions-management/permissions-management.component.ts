import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { AddPermisionDialogComponent } from '../components/add-permision-dialog/add-permision-dialog.component';
import { EditPermisionDialogComponent } from '../components/edit-permision-dialog/edit-permision-dialog.component';

@Component({
    selector: 'app-permissions-management',
    templateUrl: './permissions-management.component.html',
    styleUrls: ['./permissions-management.component.scss'],
    animations: [routerTransition()],
})
export class PermissionsManagementComponent implements AfterViewInit, OnInit {
    searchFormFilters = [
        { name: 'Category', field: 'category', filter: true },
        { name: 'Code', field: 'code', filter: true },
        { name: 'Type', field: 'type', filter: true },
        { name: 'Menu', field: 'menu', filter: true },
        { name: 'Channel', field: 'channel', filter: true },
    ];

    tableColumns = [
        'category',
        'code',
        'type',
        'menu',
        'channel',
        'manage',
    ];

    searchForm: FormGroup;
    isLoading = false;

    permissions = [];

    dataSource: MatTableDataSource<any>;
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
        private formBuilder: FormBuilder,
        private pagerService: PagerService,
        private dialog: MatDialog,
    ) {

        this.dataSource = new MatTableDataSource <any>(this.permissions);
    }

    ngOnInit() {
        this.getPermissions();
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

    AddPermission() {
        this.dialog.open(AddPermisionDialogComponent, {});
    }

    EditInformation(permission) {
        sessionStorage.setItem('permission', JSON.stringify(permission));
        this.dialog.open(EditPermisionDialogComponent, {});
    }

    getPermissions(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        vm._request.PostRequest(
            'api/permission/list_all',
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
                        vm.toastr.warning('No permission(s) found', 'NOTE');
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
        this.getPermissions(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getPermissions();
    }
}
