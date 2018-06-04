import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MomentModule } from 'angular2-moment';
import { FilterFormModule } from '../../shared/custom';
import { DemoMaterialModule } from '../../shared/modules/materialModule';
import { CdkDetailRowModule, PageHeaderModule } from './../../shared';
import { AssessmentViewRoutingModule } from './assessment-view-routing.module';
import { AssessmentViewComponent } from './assessment-view.component';

@NgModule({
    imports: [
        CommonModule,
        CdkDetailRowModule,
        AssessmentViewRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        MomentModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }),
          FilterFormModule,
    ],
    declarations: [AssessmentViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssessmentViewModule { }
