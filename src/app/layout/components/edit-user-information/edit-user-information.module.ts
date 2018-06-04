import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { EditUserInformationComponent } from './edit-user-information.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [EditUserInformationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditUserInformationModule { }
