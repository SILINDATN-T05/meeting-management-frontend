import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MomentModule } from 'angular2-moment';
import { DialogService } from 'ng2-bootstrap-modal';
import { DropdownModule } from 'ng2-dropdown';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './core/authentication/authentication.service';
import { AuthGuard } from './shared';
import { DialogProfileComponent } from './shared/components/';
import { DemoMaterialModule } from './shared/modules/materialModule';
import { PagerService } from './shared/services/pager.service';
import { RequestService } from './shared/services/request.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),
        BrowserModule,
        AngularFontAwesomeModule,
        BrowserAnimationsModule,
        HttpClientModule,
        DropdownModule,
        HttpModule,
        MomentModule,
        DemoMaterialModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
          }),
        AppRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    declarations: [AppComponent, DialogProfileComponent],
    providers: [AuthGuard, AuthenticationService, RequestService, DialogService, PagerService, ToastrService],
    bootstrap: [AppComponent],
    entryComponents: [DialogProfileComponent],
})
export class AppModule {}
