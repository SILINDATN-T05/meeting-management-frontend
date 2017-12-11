import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MeetingsComponent } from './meeting.component';
import { MeetingsRoutingModule } from './meeting-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        MeetingsRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule
    ],
    declarations: [MeetingsComponent]
})
export class MeetingsModule { }
