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
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FileUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private caseService: CaseService,
    private snackBar: MatSnackBar
  ) { }

  onFileSelect(event: any) {
    this.file = event.target.files[0];
  }

  onUploadClick(): void {
    if (this.file) {
      this.loading = true;
      this.caseService.addCase(this.file).subscribe({
        next: (response) => {
          console.log(response);
          this.snackBar.open('Case uploaded successfully!', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: (e) => {
          this.snackBar.open('An error occurred while uploading the case.', 'Close', { duration: 3000 });
          console.error(e);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } 
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
