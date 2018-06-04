import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { RemoveUserRoleComponent } from './remove-user-role.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [RemoveUserRoleComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RemoveUserRoleModule { }
