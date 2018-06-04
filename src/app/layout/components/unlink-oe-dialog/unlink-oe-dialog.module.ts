import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { UnlinkOeDialogComponent } from './unlink-oe-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [UnlinkOeDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UnlinkOeDialogModule { }
