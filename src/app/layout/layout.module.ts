import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { DemoMaterialModule } from '../shared/modules/materialModule';
import { MyFilterPipe } from '../shared/pipes/my-filter.pipe';
import { AddApplicationPermissionComponent } from './components/add-application-permission/add-application-permission.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';
import { AddMeetingDialogComponent } from './components/add-meeting-dialog/add-meeting-dialog.component';
import { AddMeetingTypeDialogComponent } from './components/add-meeting-type-dialog/add-meeting-type-dialog.component';
import { AddPermisionDialogComponent } from './components/add-permision-dialog/add-permision-dialog.component';
import { AddRoleDialogComponent } from './components/add-role-dialog/add-role-dialog.component';
import { AddRolePermisionDialogComponent } from './components/add-role-permision-dialog/add-role-permision-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { AddUserRoleComponent } from './components/add-user-role/add-user-role.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditApplicationComponent } from './components/edit-application/edit-application.component';
import { EditPermisionDialogComponent } from './components/edit-permision-dialog/edit-permision-dialog.component';
import { EditRoleDialogComponent } from './components/edit-role-dialog/edit-role-dialog.component';
import { EditUserInformationComponent } from './components/edit-user-information/edit-user-information.component';
import { EditUsernameComponent } from './components/edit-username/edit-username.component';
import { HeaderComponent } from './components/header/header.component';
import { RemoveApplicationPermissionComponent } from './components/remove-application-permission/remove-application-permission.component';
import { RemoveRolePermisionDialogComponent } from './components/remove-role-permision-dialog/remove-role-permision-dialog.component';
import { RemoveUserRoleComponent } from './components/remove-user-role/remove-user-role.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
          NgIdleKeepaliveModule.forRoot(),
          Ng4GeoautocompleteModule.forRoot(),
          DemoMaterialModule,
        NgbDropdownModule.forRoot(),
        // ToastrModule.forRoot({
        //     timeOut: 10000,
        //     positionClass: 'toast-top-right',
        //     preventDuplicates: true,
        //   }),
    ],
    entryComponents: [
        AddUserDialogComponent,
        ConfirmDialogComponent,
        AddRoleDialogComponent,
        EditRoleDialogComponent,
        AddRolePermisionDialogComponent,
        RemoveRolePermisionDialogComponent,
        AddPermisionDialogComponent,
        EditPermisionDialogComponent,
        EditUserInformationComponent,
        EditUsernameComponent,
        ChangePasswordComponent,
        AddApplicationPermissionComponent,
        RemoveApplicationPermissionComponent,
        EditApplicationComponent,
        AddApplicationComponent,
        RemoveUserRoleComponent,
        AddUserRoleComponent,
    ],
    providers: [AuthenticationGuard],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [LayoutComponent,
        SidebarComponent,
        HeaderComponent,
        MyFilterPipe,
    ],
})
export class LayoutModule {}
