import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentNotificationComponent } from './assessment-notification.component';

const routes: Routes = [
    { path: '', component: AssessmentNotificationComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssessmentNotificationRoutingModule { }
