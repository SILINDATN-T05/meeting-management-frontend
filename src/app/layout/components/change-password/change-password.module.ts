import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { ChangePasswordComponent } from './change-password.component';
@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        DemoMaterialModule,
    ],
    declarations: [ChangePasswordComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChangePasswordModule { }
