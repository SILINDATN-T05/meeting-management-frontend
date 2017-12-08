import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingTypesComponent } from './meeting-type.component';

const routes: Routes = [
    { path: '', component: MeetingTypesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MeetingTypesRoutingModule { }
