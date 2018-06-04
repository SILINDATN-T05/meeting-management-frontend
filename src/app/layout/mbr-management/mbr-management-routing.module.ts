import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MbrManagementComponent } from './mbr-management.component';

const routes: Routes = [
    { path: '', component: MbrManagementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MbrManagementRoutingModule { }
