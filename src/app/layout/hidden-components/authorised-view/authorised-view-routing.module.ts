import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisedViewComponent } from './authorised-view.component';

const routes: Routes = [
    { path: '', component: AuthorisedViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthorisedViewRoutingModule { }
