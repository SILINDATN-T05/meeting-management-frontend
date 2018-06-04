import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { MatRipple } from '@angular/material';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[cdkDetailRow]',
    providers: [ MatRipple ],
})
export class CdkDetailRowDirective {
    private row: any;
    private tRef: TemplateRef<any>;
    private opened: boolean;
    private backgroundColor: any;

    @HostBinding('class.expanded')
    get expended(): boolean {
        return this.opened;
    }

    @Input()
    set cdkDetailRow(value: any) {
        if (value !== this.row) {
            this.row = value;
            // this.render();
        }
    }

    @Input('cdkDetailRowTpl')
    set template(value: TemplateRef<any>) {
        if (value !== this.tRef) {
            this.tRef = value;
            // this.render();
        }
    }

    constructor(public vcRef: ViewContainerRef, private el: ElementRef) {
    }

    @HostListener('click')
    onClick(): void {
        this.toggle();
    }

    toggle(): void {
        if (this.opened) {
            this.vcRef.clear();
        } else {
            this.render();
        }
        this.opened = this.vcRef.length > 0;
    }

    private render(): void {
        this.vcRef.clear();
        console.log('clicking render 2');
        if (this.tRef && this.row) {
            console.log('clicking create view');
            this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
        }
    }
}
