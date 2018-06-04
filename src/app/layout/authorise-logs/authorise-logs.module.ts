import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { AuthoriseLogsRoutingModule } from './authorise-logs-routing.module';
import { AuthoriseLogsComponent } from './authorise-logs.component';
@NgModule({
    imports: [
        CommonModule,
        AuthoriseLogsRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
    ],
    declarations: [AuthoriseLogsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthoriseLogsModule { }
