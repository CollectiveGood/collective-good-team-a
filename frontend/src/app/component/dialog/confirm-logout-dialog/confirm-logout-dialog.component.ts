import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout-dialog',
  templateUrl: './confirm-logout-dialog.component.html',
  styleUrls: ['./confirm-logout-dialog.component.css']
})
export class ConfirmLogoutDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>) { }

  confirmLogout(): void {
    this.dialogRef.close(true);
  }

  cancelLogout(): void {
    this.dialogRef.close(false);
  }
}
