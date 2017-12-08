import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MeetingTypesComponent } from './meeting-type.component';
import { MeetingTypesRoutingModule } from './meeting-type-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        MeetingTypesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule
    ],
    declarations: [MeetingTypesComponent]
})
export class MeetingTypesModule { }
