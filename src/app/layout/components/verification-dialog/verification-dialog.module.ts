import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { MyFilterPipe } from './../../../shared/pipes/my-filter.pipe';
import { VerificationDialogComponent } from './verification-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [VerificationDialogComponent, MyFilterPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VerificationDialogModule { }
