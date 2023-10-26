import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnChanges {
  @Input() pdfData!: Blob;
  pdfDataUrl: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Load pdf when data becomes available
    if (changes['pdfData']) {
      const newPdfData = changes['pdfData'].currentValue as Blob;
      if (newPdfData) {
        this.loadPdf(newPdfData);
      }
    }
  }

  loadPdf(pdfData: Blob): void {
    // Load PDF to be rendered
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        if (data instanceof ArrayBuffer) {
          // Create object URL and mark it as safe
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        } else {
          this.pdfDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
        }
      }
    };
    fileReader.readAsArrayBuffer(pdfData);
  }
  
}
