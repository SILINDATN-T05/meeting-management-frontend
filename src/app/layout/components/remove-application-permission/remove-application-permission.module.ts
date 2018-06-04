import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { RemoveApplicationPermissionComponent } from './remove-application-permission.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [RemoveApplicationPermissionComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemoveApplicationPermissionModule { }
