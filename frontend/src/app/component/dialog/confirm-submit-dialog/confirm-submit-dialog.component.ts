import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-submit-dialog',
  templateUrl: './confirm-submit-dialog.component.html',
  styleUrls: ['./confirm-submit-dialog.component.css']
})
export class ConfirmSubmitDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmSubmitDialogComponent>) { }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
