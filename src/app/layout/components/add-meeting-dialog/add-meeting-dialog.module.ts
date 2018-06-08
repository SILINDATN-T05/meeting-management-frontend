import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddMeetingDialogComponent } from './add-meeting-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
    ],
    declarations: [AddMeetingDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddApplicationModule { }
