import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css', '../../../app.component.css']
})
export class PasswordChangeDialogComponent {

  newPasswordData = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }

  errorMessage: string = '';
  success: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }


  onConfirmClick(): void {
    // Reset error message
    this.errorMessage = '';
    const userDetails = this.data.userDetails;
    if (!userDetails) {
      this.errorMessage = 'An error occurred while changing the password.';
      return;
    }
    
    // Validate input
    if (this.newPasswordData.oldPassword === '' || this.newPasswordData.newPassword === '' || this.newPasswordData.confirmNewPassword === '') {
      this.errorMessage = 'All fields are required.';
      return;
    } else if (this.newPasswordData.newPassword !== this.newPasswordData.confirmNewPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    } else if (this.newPasswordData.newPassword.length < 8) {
      this.errorMessage = 'New password must be at least 8 characters long.';
      return;
    } else if (this.newPasswordData.oldPassword === this.newPasswordData.newPassword) {
      this.errorMessage = 'New password cannot be the same as the old password.';
      return;
    } else {
      this.userService.changePassword(userDetails?.email!, this.newPasswordData.newPassword, this.newPasswordData.oldPassword).subscribe({
        next: (response) => {
          console.log(response);
          this.success = true;
        },
        error: (e) => {
          if (e.status === 409) {
            // Old password is incorrect
            this.errorMessage = 'Incorrect old password.';
          } else {
            // Handle other errors
            this.errorMessage = 'An error occurred while changing the password.';
          }
        }
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(true);
  }

  onCloseClick(): void {
    this.dialogRef.close(true);
  }
}
