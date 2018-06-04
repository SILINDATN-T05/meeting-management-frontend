import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { InsurerManagementRoutingModule } from './insurer-management-routing.module';
import { InsurerManagementComponent } from './insurer-management.component';

@NgModule({
  imports: [
    CommonModule,
    InsurerManagementRoutingModule,
    PageHeaderModule,
    DemoMaterialModule,
    MomentModule,
    ConfirmationPopoverModule.forRoot({
        confirmButtonType: 'danger', // set defaults here
      }),
    FilterFormModule,
  ],
  declarations: [InsurerManagementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InsurerManagementModule { }
