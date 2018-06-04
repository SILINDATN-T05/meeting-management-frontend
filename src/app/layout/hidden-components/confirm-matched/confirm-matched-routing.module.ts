import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmMatchedComponent } from './confirm-matched.component';

const routes: Routes = [
    { path: '', component: ConfirmMatchedComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ConfirmMatchedRoutingModule { }
