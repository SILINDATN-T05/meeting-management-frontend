import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { CdkDetailRowModule, PageHeaderModule } from './../../../shared';
import { ConfirmMatchedRoutingModule } from './confirm-matched-routing.module';
import { ConfirmMatchedComponent } from './confirm-matched.component';
@NgModule({
    imports: [
        CommonModule,
        MomentModule,
        ConfirmMatchedRoutingModule,
        PageHeaderModule,
        CdkDetailRowModule,
        DemoMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    entryComponents: [ConfirmMatchedComponent],
    declarations: [ConfirmMatchedComponent],
    bootstrap: [ConfirmMatchedComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfirmMatchedModule { }
