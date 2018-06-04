import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddRolePermisionDialogComponent } from './add-role-permision-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [AddRolePermisionDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddRolePermisionDialogModule { }
