import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { EditMbrDialogComponent } from './edit-mbr-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [EditMbrDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditMbrDialogModule { }
