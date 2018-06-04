import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Logger } from '../../core/logger.service';
import { routerTransition } from '../../router.animations';
import { ICounts } from '../../shared/interfaces/counts.interface';
import { ICredentials } from '../../shared/interfaces/response.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { RequestService } from '../../shared/services/request.service';
const log = new Logger('Dashboard');

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
})
export class DashboardComponent implements OnInit {
    user: IUser;
    Permissions = [];
    isLoading = false;
    NoCharts = true;
    NoChard = true;
    // Pie
    public chartsData = [];
    public pieChartType = 'pie';
    Counts: ICounts;
    constructor(private _request: RequestService, public router: Router,
                public toastr:  ToastrService,
                vcr: ViewContainerRef) {

        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.getBranch();
        try {
            if (this.user === null || this.user.firstName === '') {
                try {
                    const jsd_widget = document.getElementById('jsd-widget');
                    jsd_widget.style.opacity = '0';
                } catch (err) {
                    log.debug(err.message);
                }
                this.router.navigate(['/login'], { replaceUrl: true });
            }
        } catch (e) {
            try {
                const jsd_widget = document.getElementById('jsd-widget');
                jsd_widget.style.opacity = '0';
            } catch (err) {
                log.debug(err.message);
            }
            this.router.navigate(['/login'], { replaceUrl: true });
        }
    }

    ngOnInit() {
        this.Counts = {
            permission: {
                permissions: {
                    name: '',
                    keys: [],
                    value: [],
                },
                total: 0,
            },
            users: 0,
            roles: 0,
            verification: {
                verification: {
                    name: '',
                    keys: [],
                    value: [],
                },
                total: 0,
            },
            standards: {
                standards: {
                    name: '',
                    keys: [],
                    value: [],
                },
                total: 0,
            },
        };
        this.Permissions = JSON.parse(sessionStorage.getItem('permissions'));
        this.getCounts();
        this.getCountParts();
        this.getBranch();
        this.getPartStandards();
    }
    checkPermission(permission) {
        const found = _.findIndex(this.Permissions, {code: permission});
        if (found >= 0) {
            this.NoChard = false;
        }
        return found < 0;
    }
    checkPermissionChart(permission) {
        const found = _.findIndex(this.Permissions, {code: permission});
        if (found >= 0) {
            this.NoCharts = false;
        }
        return found < 0;
    }
    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }
    getCountParts() {
        const vm = this;
        const options = {
            query: {},
        };
        const found  = _.findIndex(vm.Permissions, {code: 'UM_MENU_PART_MANAGEMENT'});
        if (found >= 0) {
            vm.isLoading = true;
            vm._request.PostRequest('match/count_parts', options, function(res: ICredentials) {
                if (res.code === '00' && res.data) {
                    vm.Counts.standards = res.data;
                    vm.chartsData.push({
                        name: vm.Counts.standards.standards.name,
                        data: vm.Counts.standards.standards.value,
                        keys: vm.Counts.standards.standards.keys,
                        permission: 'UM_MENU_PART_MANAGEMENT',
                    });
                    vm.isLoading = false;
                }
            });
        }
    }
    getBranch() {
        const vm = this;
        this._request.PostRequest('api/branch/list_all', {}, function(res: ICredentials) {
            if (res.code === '00' && res.data) {
                sessionStorage.setItem('branches', JSON.stringify(res.data));
            }
        });
    }
    getCounts() {
        const vm = this;
        const options = {
            query: {},
        };
        vm.isLoading = true;
        vm._request.PostRequest('api/count/count_all', options, function(res: ICredentials) {
            if (res.code === '00' && res.data) {
                vm.Counts.permission = res.data.permission;
                vm.Counts.users = res.data.users;
                vm.Counts.roles = res.data.roles;
                vm.Counts.verification = res.data.verification;
                vm.chartsData.push({
                    name: vm.Counts.permission.permissions.name,
                    data: vm.Counts.permission.permissions.value,
                    keys: vm.Counts.permission.permissions.keys,
                    permission: 'UM_MENU_PERMISSION_MANAGEMENT',
                });
                vm.chartsData.push({
                    name: vm.Counts.verification.verification.name,
                    data: vm.Counts.verification.verification.value,
                    keys: vm.Counts.verification.verification.keys,
                    permission: 'UM_MENU_VERIFICATION',
                });
                vm.isLoading = false;
            }
        });
    }
    getPartStandards() {
        const vm = this;
        const options = {
            query: {},
        };
        vm._request.PostRequest('match/get_part_standard_by_query/', options, function(res: ICredentials) {
            if (res.code === '00' && res.data.length > 0) {
                sessionStorage.setItem('standard', JSON.stringify(res.data));
            }
        });
    }
}
