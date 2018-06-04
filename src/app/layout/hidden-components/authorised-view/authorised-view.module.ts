import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { PageHeaderModule } from './../../../shared';
import { AuthorisedViewRoutingModule } from './authorised-view-routing.module';
import { AuthorisedViewComponent } from './authorised-view.component';
@NgModule({
    imports: [
        CommonModule,
        MomentModule,
        AuthorisedViewRoutingModule,
        PageHeaderModule,
        DemoMaterialModule,
    ],
    entryComponents: [AuthorisedViewComponent],
    declarations: [AuthorisedViewComponent],
    bootstrap: [AuthorisedViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthorisedViewModule { }
