import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-changes-dialog',
  templateUrl: './save-changes-dialog.component.html',
  styleUrls: ['./save-changes-dialog.component.css']
})
export class SaveChangesDialogComponent {

  constructor(public dialogRef: MatDialogRef<SaveChangesDialogComponent>) {}

  onSave(): void {
    this.dialogRef.close(true);
  }

  onDiscard(): void {
    this.dialogRef.close(false);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
