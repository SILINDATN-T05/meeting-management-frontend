import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-pdf-display',
  templateUrl: './pdf-display.component.html',
  styleUrls: ['./pdf-display.component.scss'],
  animations: [routerTransition()],
})
export class PdfDisplayComponent implements OnInit {
  pdfSrc = '';
  page: 1;
  pageurl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer,
              private dialogRef: MatDialogRef <PdfDisplayComponent>) { }

  ngOnInit() {
    this.pdfSrc = 'data:application/pdf;base64,' + sessionStorage.getItem('pdfAttachment');
    this.pageurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
  Close() {
    this.dialogRef.close();
  }
}
