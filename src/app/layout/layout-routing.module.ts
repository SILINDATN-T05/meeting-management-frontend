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
            { path: 'parts-management', loadChildren: './parts-management/parts-management.module#PartsManagementModule' },
            { path: 'verification', loadChildren: './verification/verification.module#VerificationModule' },
            { path: 'confirm-matched', loadChildren: './hidden-components/confirm-matched/confirm-matched.module#ConfirmMatchedModule' },
            { path: 'authorised-view', loadChildren: './hidden-components/authorised-view/authorised-view.module#AuthorisedViewModule' },
            { path: 'roles-management', loadChildren: './roles-management/roles-management.module#RolesManagementModule' },
            { path: 'permissions-management', loadChildren: './permissions-management/permissions-management.module#PermissionsManagementModule' },
            { path: 'user-notification', loadChildren: './user-notification/user-notification.module#UserNotificationModule'},
            { path: 'assessment-notification', loadChildren: './assessment-notification/assessment-notification.module#AssessmentNotificationModule'},
            { path: 'applications-management', loadChildren: './application-management/application-management.module#ApplicationManagementModule'},
            { path: 'authorised-assessment', loadChildren: './authorised-assessment/authorised-assessment.module#AuthorisedAssessmentModule'},
            { path: 'pending-assessment', loadChildren: './pending-assessment/pending-assessment.module#PendingAssessmentModule'},
            { path: 'assessment-logs', loadChildren: './assessment-logs/assessment-logs.module#AssessmentLogsModule'},
            { path: 'authorise-logs', loadChildren: './authorise-logs/authorise-logs.module#AuthoriseLogsModule'},
            { path: 'approve-logs', loadChildren: './approve-logs/approve-logs.module#ApproveLogsModule'},
            { path: 'mbr-management', loadChildren: './mbr-management/mbr-management.module#MbrManagementModule'},
            { path: 'insurer-management', loadChildren: './insurer-management/insurer-management.module#InsurerManagementModule'},
            { path: 'assessment-view', loadChildren: './assessment-view/assessment-view.module#AssessmentViewModule'},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
