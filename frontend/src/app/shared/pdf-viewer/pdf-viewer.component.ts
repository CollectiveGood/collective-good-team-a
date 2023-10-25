import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent {
  @Input() pdfData!: Blob;
  pdfSrc: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.pdfData) {
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.pdfData));
    }
  }
}
