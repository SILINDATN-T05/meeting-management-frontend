import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from '../../../core/logger.service';
import { IUser } from '../../../shared/interfaces/user.interface';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { EditUserInformationComponent } from '../edit-user-information/edit-user-information.component';
const log = new Logger('Header');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    pushRightClass = 'push-right';
    user: IUser;
    constructor(
        private translate: TranslateService,
        public router: Router,
        private dialog: MatDialog) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');
        this.user = JSON.parse(sessionStorage.getItem('user'));
        try {
            if (this.user === null || this.user.firstName === '') {
                try {
                    const jsd_widget = document.getElementById('jsd-widget');
                    jsd_widget.style.opacity = '0';
                } catch (err) {
                    log.debug(err.message);
                }
                this.router.navigate(['/login'], { replaceUrl: true });
            }
        } catch (e) {
            try {
                const jsd_widget = document.getElementById('jsd-widget');
                jsd_widget.style.opacity = '0';
            } catch (err) {
                log.debug(err.message);
            }
            this.router.navigate(['/login'], { replaceUrl: true });
        }
        this.router.events.subscribe((val) => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }
    EditInformation() {
        sessionStorage.setItem('update_user', JSON.stringify(this.user));
        this.dialog.open(EditUserInformationComponent, {});
    }
    changePassword() {
        sessionStorage.setItem('update_user', JSON.stringify(this.user));
        this.dialog.open(ChangePasswordComponent, {});
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        const jsd_widget = document.getElementById('jsd-widget');
        jsd_widget.style.opacity = '0';
        localStorage.clear();
        sessionStorage.clear();
    }
}
