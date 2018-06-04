import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { CdkDetailRowModule, PageHeaderModule } from './../../shared';
import { AuthorisedAssessmentRoutingModule } from './authorised-assessment-routing.module';
import { AuthorisedAssessmentComponent } from './authorised-assessment.component';
@NgModule({
    imports: [
        CommonModule,
        CdkDetailRowModule,
        AuthorisedAssessmentRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
        FilterFormModule,
    ],
    declarations: [AuthorisedAssessmentComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthorisedAssessmentModule { }
