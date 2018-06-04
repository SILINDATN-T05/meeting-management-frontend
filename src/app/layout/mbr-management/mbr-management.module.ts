import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { CdkDetailRowModule, PageHeaderModule } from './../../shared';
import { MbrManagementRoutingModule } from './mbr-management-routing.module';
import { MbrManagementComponent } from './mbr-management.component';
@NgModule({
    imports: [
        CommonModule,
        MbrManagementRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
          CdkDetailRowModule,
          FilterFormModule,
    ],
    declarations: [MbrManagementComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MbrManagementModule { }
