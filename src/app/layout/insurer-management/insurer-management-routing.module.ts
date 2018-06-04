import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurerManagementComponent } from './insurer-management.component';

const routes: Routes = [
  { path: '', component: InsurerManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsurerManagementRoutingModule { }
