import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { RemoveRolePermisionDialogComponent } from './remove-role-permision-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [RemoveRolePermisionDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemoveRolePermisionDialogModule { }
