import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { CancelAssessmentDialogComponent } from './cancel-assessment-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        DemoMaterialModule,
    ],
    declarations: [CancelAssessmentDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CancelAssessmentDialogModule { }
