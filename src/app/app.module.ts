import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from "./login/login.module";
import { AuthenticationService, EqualPipe } from './core/authentication/authentication.service';
import { BootstrapModalModule, DialogService } from 'ng2-bootstrap-modal';
import { DialogProfileComponent } from "./shared/components/profile/profile.component";
import { NotificationComponent } from "./shared/components/notification/notification.component";
import { AddUserComponent } from "./layout/users/add/add.component";
import { AddMeetingTypeComponent } from "./layout/meeting-type/add/add.component";
import { AuthGuard } from './shared';
import { RequestService } from "./shared/services/request.service";
import { FormWizardModule } from 'angular2-wizard';
import { MatDialogModule, MAT_PLACEHOLDER_GLOBAL_OPTIONS} from '@angular/material';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { AngularMultiSelectModule } from "angular2-multiselect-checkbox/angular2-multiselect-dropdown";
// import { AngularMultiSelectModule } from '';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent,DialogProfileComponent, AddUserComponent,NotificationComponent, AddMeetingTypeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MultiselectDropdownModule,
        AngularMultiSelectModule,
        ReactiveFormsModule ,
        HttpModule,
        FormWizardModule,
        MatDialogModule,
        AppRoutingModule,
        BootstrapModalModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [AuthGuard, AuthenticationService,RequestService, DialogService,EqualPipe, {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'never'}}],
    bootstrap: [AppComponent],
    entryComponents:[DialogProfileComponent, AddUserComponent,NotificationComponent, AddMeetingTypeComponent]
})
export class AppModule {
}
