import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { UserNotificationRoutingModule } from './user-notification-routing.module';
import { UserNotificationComponent } from './user-notification.component';
@NgModule({
    imports: [
        CommonModule,
        UserNotificationRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
        FilterFormModule,
    ],
    declarations: [UserNotificationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserNotificationModule { }
