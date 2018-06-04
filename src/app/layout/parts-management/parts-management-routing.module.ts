import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartsManagementComponent } from './parts-management.component';

const routes: Routes = [
    {
        path : '',
        component : PartsManagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PartsManagementRoutingModule {
}
