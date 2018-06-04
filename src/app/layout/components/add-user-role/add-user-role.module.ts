import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddUserRoleComponent } from './add-user-role.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [AddUserRoleComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddUserRoleModule { }
