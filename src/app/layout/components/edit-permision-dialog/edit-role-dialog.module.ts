import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { EditPermisionDialogComponent } from './edit-permision-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [EditPermisionDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditPermisionDialogModule { }
