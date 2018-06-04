import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { PartDescriptionDialogComponent } from './part-description-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [PartDescriptionDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PartDescriptionDialogModule { }
