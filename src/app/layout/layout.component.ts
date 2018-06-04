import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, DocumentInterruptSource, EventTargetInterruptOptions, Idle, StorageInterruptSource } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Logger } from '../core/logger.service';
const log = new Logger('Layout');

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    @ViewChild('myButton') myButton: ElementRef;
    jsd_widget: HTMLElement;
    idleState = 'Not started.';
    timedOut = false;
    displayCount = false;
    CountDown = 100;
    lastPing?: Date = null;
    constructor(private idle: Idle,
                private keepalive: Keepalive,
                public router: Router,
                private dialog: MatDialog) {
        // sets an idle timeout of 600 seconds, for testing purposes.
            idle.setIdle(3600);
        // sets a timeout period of 15 seconds. after 600 seconds of inactivity, the user will be considered timed out.
            idle.setTimeout(60);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
            idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
            idle.setInterrupts(this.DefaultInterruptSources());
            idle.onIdleEnd.subscribe(() => {
                this.idleState = 'No longer idle.';
                this.displayCount = false;
            });
            idle.onTimeout.subscribe(() => {
                this.idleState = 'Timed out!';
                this.timedOut = true;
                try {
                const jsd_widget = document.getElementById('jsd-widget');
                jsd_widget.style.opacity = '0';
                } catch (err) {
                    log.debug(err.message);
                }
                this.dialog.closeAll();
                localStorage.clear();
                sessionStorage.clear();
                this.router.navigate(['/login'], { replaceUrl: true });
            });
            idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
            idle.onTimeoutWarning.subscribe((countdown) =>  {
                this.displayCount = true;
                this.CountDown = (countdown / 20) * 100;
                this.idleState = 'You will be logged out in ' + countdown + ' seconds!';
            });
        // sets the ping interval to 15 seconds
            keepalive.interval(15);
            keepalive.onPing.subscribe(() => this.lastPing = new Date());
            this.reset();
        }

    ngOnInit() {
        this.setSelectedPageNav();

    }
    DefaultInterruptSources(options?: EventTargetInterruptOptions) {
    return [new DocumentInterruptSource(
      'mousemove keydown DOMMouseScroll mousewheel mousedown touchstart touchmove scroll', options),
    new StorageInterruptSource()];
  }
    setSelectedPageNav() {
        this.jsd_widget = document.getElementById('jsd-widget');
        this.jsd_widget.style.opacity = '10';
    }
    reset() {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
      }
}
