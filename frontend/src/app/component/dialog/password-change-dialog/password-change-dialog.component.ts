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
  loading: boolean = false; // for loading bar

  constructor(
    public dialogRef: MatDialogRef<PasswordChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
  ) { }


  onConfirmClick(): void {
    // Reset error message
    this.errorMessage = '';
    const userDetails = this.data.userDetails;
    if (!userDetails) {
      this.dialogRef.close('An error occurred retrieving your credentials.'); // Close the dialog if the user details are not available (should not happen)
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
    }
    
    // Complete the password change
    this.loading = true;
    this.userService.updateProfile(userDetails?.name!, userDetails?.email!, this.newPasswordData.oldPassword, this.newPasswordData.newPassword).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close('Your password has been changed successfully!');
      },
      error: (e) => {
        this.loading = false;
        if (e.status === 409) {
          // Old password is incorrect
          this.errorMessage = 'Current password is incorrect.';
        } else {
          // Handle other errors
          this.dialogRef.close('An error occurred while changing your password.')
        }
      },
      complete: () => {       
        this.loading = false;
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
