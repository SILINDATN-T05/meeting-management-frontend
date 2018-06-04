import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';
import { ImageViewerModule } from 'ngx-image-viewer';
import { DemoMaterialModule } from '../../../shared/modules/materialModule';
import { ImageSliderDialogComponent } from './image-slider-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbModule.forRoot(),
        NgbAlertModule.forRoot(),
        NgxGalleryModule,
        ImageViewerModule.forRoot({
            btnClass: 'default', // The CSS class(es) that will apply to the buttons
            zoomFactor: 0.1, // The amount that the scale will be increased by
            containerBackgroundColor: '#ccc', // The color to use for the background. This can provided in hex, or rgb(a).
            wheelZoom: true, // If true, the mouse wheel can be used to zoom in
            allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to entr fullscreen mode
            btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
              zoomIn: 'fa fa-plus',
              zoomOut: 'fa fa-minus',
              rotateClockwise: 'fa fa-repeat',
              rotateCounterClockwise: 'fa fa-undo',
              next: 'fa fa-arrow-right',
              prev: 'fa fa-arrow-left',
              fullscreen: 'fa fa-arrows-alt',
            },
          }),
        DemoMaterialModule,
    ],
    declarations: [ImageSliderDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageSliderDialogModule { }
