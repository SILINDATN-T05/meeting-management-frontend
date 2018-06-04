import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddMbrDialogComponent } from './add-mbr-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
        Ng4GeoautocompleteModule.forRoot(),
    ],
    declarations: [AddMbrDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddMbrDialogModule { }
