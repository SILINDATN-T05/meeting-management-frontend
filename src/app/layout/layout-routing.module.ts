import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'user-management', loadChildren: './users/users.module#UsersModule' },
            { path: 'roles-management', loadChildren: './roles-management/roles-management.module#RolesManagementModule' },
            { path: 'permissions-management', loadChildren: './permissions-management/permissions-management.module#PermissionsManagementModule' },
            { path: 'user-notification', loadChildren: './user-notification/user-notification.module#UserNotificationModule'},
            { path: 'applications-management', loadChildren: './application-management/application-management.module#ApplicationManagementModule'},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
