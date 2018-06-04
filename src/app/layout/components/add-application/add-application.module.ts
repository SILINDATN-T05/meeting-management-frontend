import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddApplicationComponent } from './add-application.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [AddApplicationComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddApplicationModule { }
