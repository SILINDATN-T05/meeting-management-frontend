import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { ConfirmDialogComponent } from './confirm-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [ConfirmDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfirmDialogModule { }
