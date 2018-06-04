import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { MatRipple } from '@angular/material';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[cdkDetailRowRender]',
    providers: [ MatRipple ],
})
export class CdkDetailRowRenderDirective  implements /*AfterViewInit*/ OnInit {
    private row: any;
    private tRef: TemplateRef<any>;
    private opened: boolean;
    private backgroundColor: any;

    @HostBinding('class.expanded')
    get expended(): boolean {
        return this.opened;
    }

    @Input()
    set cdkDetailRowRender(value: any) {
        if (value !== this.row) {
            this.row = value;
            // this.render();
        }
    }

    @Input('cdkDetailRowRenderTpl')
    set template(value: TemplateRef<any>) {
        if (value !== this.tRef) {
            this.tRef = value;
            // this.render();
        }
    }

    constructor(public vcRef: ViewContainerRef, private el: ElementRef) {
    }
    // ngAfterViewInit() {
    //     this.toggle();
    // }
    ngOnInit() {
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
        if (this.tRef && this.row) {
            this.vcRef.createEmbeddedView(this.tRef, { $implicit: this.row });
        }
    }
}
