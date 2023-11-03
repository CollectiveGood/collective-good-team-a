import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseService } from 'src/app/service/case/case.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent {
  files: File[] = [];
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private caseService: CaseService,
    private snackBar: MatSnackBar
  ) { }

  onFileSelect(event: any) {
    this.files = Array.from(event.target.files);
  }

  onUploadClick(): void {
    if (this.files.length > 0) {
      this.loading = true;

      const uploadObservables: Observable<HttpResponse<any>>[] = this.files.map(file => this.caseService.addCase(file));

      forkJoin(uploadObservables).subscribe({
        next: (responses) => {

          // Check if all uploads were successful
          const allUploadsSuccessful = responses.every(response => {
            return response.status === 200;
          });

          if (allUploadsSuccessful) {
            // All files were uploaded successfully
            this.snackBar.open('Case(s) uploaded successfully!', 'Close', {
              duration: 3000,
            });
            this.dialogRef.close(true);
          } else {
            // At least one upload failed
            this.snackBar.open('Failed to upload one or more files', 'Close', { duration: 3000 });
          }
        },
        error: (error) => {
          this.snackBar.open('An error occurred while uploading the case(s).', 'Close', { duration: 3000 });
          this.loading = false;
          console.error(error);
        },
      });
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
