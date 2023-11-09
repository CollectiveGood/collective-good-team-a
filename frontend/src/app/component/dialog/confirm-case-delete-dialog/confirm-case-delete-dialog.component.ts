import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-case-delete-dialog',
  templateUrl: './confirm-case-delete-dialog.component.html',
  styleUrls: ['./confirm-case-delete-dialog.component.css']
})
export class ConfirmCaseDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmCaseDeleteDialogComponent>) { }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
