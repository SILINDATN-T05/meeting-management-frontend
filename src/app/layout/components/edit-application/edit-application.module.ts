import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { EditApplicationComponent } from './edit-application.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [EditApplicationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditApplicationModule { }
