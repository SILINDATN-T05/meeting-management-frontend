import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { CopyPartDialogComponent } from './copy-part-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [CopyPartDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CopyPartDialogModule { }
