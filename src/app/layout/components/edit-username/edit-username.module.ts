import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { EditUsernameComponent } from './edit-username.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [EditUsernameComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditUsernameModule { }
