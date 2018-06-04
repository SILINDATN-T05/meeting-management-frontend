import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
import * as $ from 'jquery';
import 'jquery-browserify';
import 'jquery-mousewheel';
import 'jquery-ui';
import 'jquery-ui-touch-punch';
import * as panzoom from 'jquery.panzoom';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-image-slider-dialog',
  templateUrl: './image-slider-dialog.component.html',
  styleUrls: ['./image-slider-dialog.component.scss'],
  animations: [routerTransition()],
})
export class ImageSliderDialogComponent implements OnInit {
  imageAttachments = [];
  constructor(private dialogRef: MatDialogRef <ImageSliderDialogComponent>, private sanitizer: DomSanitizer) { }
  ngOnInit() {
    this.imageAttachments = JSON.parse(sessionStorage.getItem('imageAttachments'));
  }
  Close() {
    this.dialogRef.close();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.zoomin();
  }
  zoomin() {
    this.imageAttachments.forEach( (element, index) => {
      const scene = document.getElementById('item_' + index);
      panzoom(scene,  {
      increment: 0.2,
      duration: 500,
      disablePan: false,
      minScale: 1,
      maxScale: 5,
      contain: 'invert',
      $zoomIn: $('#zoom-in_' + index),
      $zoomOut: $('#zoom-out_' + index),
    });
    });
}
}
