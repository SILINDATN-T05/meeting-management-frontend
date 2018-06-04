import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AuthenticationGuard } from '../core/authentication/authentication.guard';
import { DemoMaterialModule } from '../shared/modules/materialModule';
import { AddApplicationPermissionComponent } from './components/add-application-permission/add-application-permission.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';
import { AddMbrDialogComponent } from './components/add-mbr-dialog/add-mbr-dialog.component';
import { AddPermisionDialogComponent } from './components/add-permision-dialog/add-permision-dialog.component';
import { AddRoleDialogComponent } from './components/add-role-dialog/add-role-dialog.component';
import { AddRolePermisionDialogComponent } from './components/add-role-permision-dialog/add-role-permision-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { AddUserRoleComponent } from './components/add-user-role/add-user-role.component';
import { CancelAssessmentDialogComponent } from './components/cancel-assessment-dialog/cancel-assessment-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CloseAssessmentDialogComponent } from './components/close-assessment-dialog/close-assessment-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CopyPartDialogComponent } from './components/copy-part-dialog/copy-part-dialog.component';
import { EditApplicationComponent } from './components/edit-application/edit-application.component';
import { EditMbrDialogComponent } from './components/edit-mbr-dialog/edit-mbr-dialog.component';
import { EditPermisionDialogComponent } from './components/edit-permision-dialog/edit-permision-dialog.component';
import { EditRoleDialogComponent } from './components/edit-role-dialog/edit-role-dialog.component';
import { EditUserInformationComponent } from './components/edit-user-information/edit-user-information.component';
import { EditUsernameComponent } from './components/edit-username/edit-username.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageSliderDialogComponent } from './components/image-slider-dialog/image-slider-dialog.component';
import { LinkOeDialogComponent } from './components/link-oe-dialog/link-oe-dialog.component';
import { PartDescriptionDialogComponent } from './components/part-description-dialog/part-description-dialog.component';
import { PartStandardDialogComponent } from './components/part-standard-dialog/part-standard-dialog.component';
import { PdfDisplayComponent } from './components/pdf-display/pdf-display.component';
import { RemoveApplicationPermissionComponent } from './components/remove-application-permission/remove-application-permission.component';
import { RemoveRolePermisionDialogComponent } from './components/remove-role-permision-dialog/remove-role-permision-dialog.component';
import { RemoveUserRoleComponent } from './components/remove-user-role/remove-user-role.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UnlinkOeDialogComponent } from './components/unlink-oe-dialog/unlink-oe-dialog.component';
import { VerificationDialogComponent } from './components/verification-dialog/verification-dialog.component';
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
        CopyPartDialogComponent,
        UnlinkOeDialogComponent,
        VerificationDialogComponent,
        LinkOeDialogComponent,
        PartStandardDialogComponent,
        PartDescriptionDialogComponent,
        PdfDisplayComponent,
        ImageSliderDialogComponent,
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
        EditMbrDialogComponent,
        AddMbrDialogComponent,
        CancelAssessmentDialogComponent,
        CloseAssessmentDialogComponent,
    ],
    providers: [AuthenticationGuard],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [LayoutComponent,
        SidebarComponent,
        HeaderComponent,
    ],
})
export class LayoutModule {}
