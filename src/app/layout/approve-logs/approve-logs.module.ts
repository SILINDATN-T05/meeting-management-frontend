import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { ApproveLogsRoutingModule } from './approve-logs-routing.module';
import { ApproveLogsComponent } from './approve-logs.component';
@NgModule({
    imports: [
        CommonModule,
        ApproveLogsRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
    ],
    declarations: [ApproveLogsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApproveLogsModule { }
