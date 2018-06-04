import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddRoleDialogComponent } from './add-role-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [AddRoleDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddRoleDialogModule { }
