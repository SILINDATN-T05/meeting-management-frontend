import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { RolesManagementRoutingModule } from './roles-management-routing.module';
import { RolesManagementComponent } from './roles-management.component';
@NgModule({
    imports: [
        CommonModule,
        RolesManagementRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
        FilterFormModule,
    ],
    declarations: [RolesManagementComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RolesManagementModule { }
