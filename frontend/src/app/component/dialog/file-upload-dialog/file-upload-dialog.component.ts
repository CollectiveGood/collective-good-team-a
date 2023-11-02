import { HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, finalize } from 'rxjs';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent {

  file: File | null = null;
  uploadProgress: number | null = null;
  uploadSub: Subscription | null = null;
  
  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private caseService: CaseService,
    private snackBar: MatSnackBar
  ) { }

  onFileSelect(event: any): void {
    this.file = event.target.files[0];

    if (this.file) {
      const upload$ = this.caseService.addCase(this.file).pipe(
        finalize(() => this.reset())
      );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else {
          // Check if upload was successful.
          if (event.status === 200) {
            this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000 });
          } else {
            this.snackBar.open('File upload failed.', 'Close', { duration: 3000 });
          }
        }
      });   
    } 
  }

  cancelUpload(): void {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset(): void {
    this.uploadProgress = 0;
    this.uploadSub = null;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
