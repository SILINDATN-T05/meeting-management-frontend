import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { AssessmentNotificationRoutingModule } from './assessment-notification-routing.module';
import { AssessmentNotificationComponent } from './assessment-notification.component';
@NgModule({
    imports: [
        CommonModule,
        AssessmentNotificationRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
          FilterFormModule,
    ],
    declarations: [AssessmentNotificationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssessmentNotificationModule { }
