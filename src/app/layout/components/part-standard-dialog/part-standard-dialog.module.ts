import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { PartStandardDialogComponent } from './part-standard-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [PartStandardDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PartStandardDialogModule { }
