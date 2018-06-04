import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { AddUserDialogComponent } from './add-user-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [AddUserDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddUserDialogModule { }
