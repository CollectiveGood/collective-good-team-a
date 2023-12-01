import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-user-role-update',
  templateUrl: './confirm-user-role-update.component.html',
  styleUrls: ['./confirm-user-role-update.component.css']
})
export class ConfirmUserRoleUpdateComponent {
  
  constructor(public dialogRef: MatDialogRef<ConfirmUserRoleUpdateComponent>) { }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
