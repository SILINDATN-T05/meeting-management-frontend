import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddApplicationPermissionComponent } from './add-application-permission.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [AddApplicationPermissionComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddApplicationPermissionModule { }
