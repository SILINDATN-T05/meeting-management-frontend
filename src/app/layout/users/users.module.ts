import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
        FilterFormModule,
    ],
    declarations: [UsersComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsersModule { }
