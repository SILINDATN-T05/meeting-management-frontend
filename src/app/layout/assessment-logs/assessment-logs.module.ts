import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { CdkDetailRowModule, PageHeaderModule } from './../../shared';
import { AssessmentLogsRoutingModule } from './assessment-logs-routing.module';
import { AssessmentLogsComponent } from './assessment-logs.component';
@NgModule({
    imports: [
        CommonModule,
        AssessmentLogsRoutingModule,
        PageHeaderModule,
        CdkDetailRowModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
    ],
    declarations: [AssessmentLogsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssessmentLogsModule { }
