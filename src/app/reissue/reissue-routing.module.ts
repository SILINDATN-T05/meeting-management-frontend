import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReissueComponent } from './reissue.component';

const routes: Routes = [
    { path: '', component: ReissueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReissueRoutingModule { }
