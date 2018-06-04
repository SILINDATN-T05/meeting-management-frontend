import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { ApplicationManagementRoutingModule } from './application-management-routing.module';
import { ApplicationManagementComponent } from './application-management.component';
@NgModule({
    imports: [
        CommonModule,
        ApplicationManagementRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
        FilterFormModule,
    ],
    declarations: [ApplicationManagementComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicationManagementModule { }
