import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { PermissionsManagementRoutingModule } from './permissions-management-routing.module';
import { PermissionsManagementComponent } from './permissions-management.component';
@NgModule({
    imports: [
        CommonModule,
        PermissionsManagementRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
        FilterFormModule,
    ],
    declarations: [PermissionsManagementComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PermissionsManagementModule { }
