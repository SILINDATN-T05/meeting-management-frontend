import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { PdfDisplayComponent } from './pdf-display.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
        PdfViewerModule,
        BrowserModule,
    ],
    declarations: [PdfDisplayComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PdfDisplayModule { }
