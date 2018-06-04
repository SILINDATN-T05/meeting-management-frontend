import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoriseLogsComponent } from './authorise-logs.component';

const routes: Routes = [
    { path: '', component: AuthoriseLogsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthoriseLogsRoutingModule { }
