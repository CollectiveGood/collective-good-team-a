import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-review-dialog',
  templateUrl: './confirm-review-dialog.component.html',
  styleUrls: ['./confirm-review-dialog.component.css']
})
export class ConfirmReviewDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmReviewDialogComponent>) { }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
