import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { CloseAssessmentDialogComponent } from './close-assessment-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        DemoMaterialModule,
    ],
    declarations: [CloseAssessmentDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CloseAssessmentDialogModule { }
