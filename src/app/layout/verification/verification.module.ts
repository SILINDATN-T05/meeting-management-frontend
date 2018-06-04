import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { FilterFormModule } from '../../shared/custom/filter-form/filter-form.module';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { PageHeaderModule } from './../../shared';
import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';

@NgModule({
    imports: [
        CommonModule,
        VerificationRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        MomentModule,
        FilterFormModule,
    ],
    declarations: [
        VerificationComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export  class  VerificationModule { }
