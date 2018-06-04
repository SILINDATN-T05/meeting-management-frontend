import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { LinkOeDialogComponent } from './link-oe-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [LinkOeDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LinkOeDialogModule { }
