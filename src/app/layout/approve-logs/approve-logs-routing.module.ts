import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveLogsComponent } from './approve-logs.component';

const routes: Routes = [
    { path: '', component: ApproveLogsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApproveLogsRoutingModule { }
