import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingAssessmentComponent } from './pending-assessment.component';

const routes: Routes = [
    { path: '', component: PendingAssessmentComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PendingAssessmentRoutingModule { }
