import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { EditRoleDialogComponent } from './edit-role-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [EditRoleDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditRoleDialogModule { }
