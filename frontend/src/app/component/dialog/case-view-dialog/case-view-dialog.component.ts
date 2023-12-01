import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-case-view-dialog',
  templateUrl: './case-view-dialog.component.html',
  styleUrls: ['./case-view-dialog.component.css']
})
export class CaseViewDialogComponent implements OnInit {

  caseBlob!: Blob; // binary data for case PDF

  constructor(
    public dialogRef: MatDialogRef<CaseViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private caseService: CaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.caseService.getCaseAsPDF(this.data.caseId).subscribe({
      next: (response: Blob) => {
        this.caseBlob = response;
      },
      error: (e) => {
        console.error('Get case failed: ', e);
      },
      complete: () => {
        if (this.caseBlob === undefined) {
          this.snackBar.open('Failed to retrieve case information', 'Close', {
            duration: 3000,
          });
        }
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
