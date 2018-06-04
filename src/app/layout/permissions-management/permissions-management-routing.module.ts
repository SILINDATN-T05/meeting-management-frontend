import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsManagementComponent } from './permissions-management.component';

const routes: Routes = [
    { path: '', component: PermissionsManagementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PermissionsManagementRoutingModule { }
