import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentLogsComponent } from './assessment-logs.component';

const routes: Routes = [
    { path: '', component: AssessmentLogsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssessmentLogsRoutingModule { }
