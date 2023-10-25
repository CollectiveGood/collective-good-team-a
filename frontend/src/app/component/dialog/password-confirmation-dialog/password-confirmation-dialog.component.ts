import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-confirmation-dialog',
  templateUrl: './password-confirmation-dialog.component.html',
  styleUrls: ['./password-confirmation-dialog.component.css']
})
export class PasswordConfirmationDialogComponent {
  
  passwordInput: string = '';

    constructor(
      public dialogRef: MatDialogRef<PasswordConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    onConfirmClick(): void {
      // TODO: Validate password
      this.dialogRef.close(true);
    }
  
    onCancelClick(): void {
      this.dialogRef.close(false);
    }
}
