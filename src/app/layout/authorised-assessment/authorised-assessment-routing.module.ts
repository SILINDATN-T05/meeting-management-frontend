import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisedAssessmentComponent } from './authorised-assessment.component';

const routes: Routes = [
    { path: '', component: AuthorisedAssessmentComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthorisedAssessmentRoutingModule { }
