import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../router.animations';
import { IApplication } from '../../shared/interfaces/application.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { PagerService } from '../../shared/services/pager.service';
import { RequestService } from '../../shared/services/request.service';
import { AddApplicationPermissionComponent } from '../components/add-application-permission/add-application-permission.component';
import { AddApplicationComponent } from '../components/add-application/add-application.component';
import { EditApplicationComponent } from '../components/edit-application/edit-application.component';
import { RemoveApplicationPermissionComponent } from '../components/remove-application-permission/remove-application-permission.component';

@Component({
    selector: 'app-application-management',
    templateUrl: './application-management.component.html',
    styleUrls: ['./application-management.component.scss'],
    animations: [routerTransition()],
})
export class ApplicationManagementComponent implements AfterViewInit, OnInit {
    tableColumns = [
        'code',
        'name',
        'description',
        'channel',
        'organizationID',
        'manage',
    ];

    isLoading = false;
    applications = [];

    dataSource: MatTableDataSource<IApplication>;
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

        this.dataSource = new MatTableDataSource <IApplication>(this.applications);
    }

    ngOnInit() {
        this.getApplication();
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

    EditInformation(application) {
        sessionStorage.setItem(
            'selectedApplication',
            JSON.stringify(application),
        );
        this.dialog.open(EditApplicationComponent, {});
    }

    AddPermission(application) {
        sessionStorage.setItem(
            'selectedApplication',
            JSON.stringify(application),
        );
        this.dialog.open(AddApplicationPermissionComponent, {});
    }

    RemovePermission(application) {
        sessionStorage.setItem(
            'selectedApplication',
            JSON.stringify(application),
        );
        this.dialog.open(RemoveApplicationPermissionComponent, {});
    }

    AddApplication() {
        this.dialog.open(AddApplicationComponent, {});
    }

    getApplication(_query: object = {}) {
        const vm = this;
        vm.isLoading = true;
        vm._request.PostRequest(
            'api/application/list_all',
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
                        vm.toastr.warning('No application(s) roles found', 'NOTE');
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
        this.getApplication(filter);
    }

    clearFilterView() {
        this.filterProps.showFilterClearButton = false;
        this.getApplication();
    }
}
