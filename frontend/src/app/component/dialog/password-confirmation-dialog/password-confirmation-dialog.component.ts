import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-password-confirmation-dialog',
  templateUrl: './password-confirmation-dialog.component.html',
  styleUrls: ['./password-confirmation-dialog.component.css', '../../../app.component.css']
})
export class PasswordConfirmationDialogComponent {
  
  passwordInput: string = '';
  errorMessage: string = '';
  success: boolean = false;
  loading: boolean = false; // for loading bar

  constructor(
    public dialogRef: MatDialogRef<PasswordConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) { }

  onConfirmClick(): void {
    // Reset error message
    this.errorMessage = '';
    if (!this.data.userDetails) {
      this.errorMessage = 'An error occurred while retrieving your credentials.';
      return;
    }

    // Validate input
    if (this.passwordInput === '') {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    // Update profile
    this.loading = true;
    this.userService.updateProfile(this.data.userDetails.name, this.data.userDetails.email, this.passwordInput, this.passwordInput).subscribe({
      next: (response) => {
        console.log(response);
        this.success = true;
      },
      error: (e) => {
        this.loading = false;
        if (e.status === 409) {
          // Password is incorrect
          this.errorMessage = 'The password is incorrect.';
        } else {
          // Handle other errors
          this.errorMessage = 'An error occurred updating your credentials.';
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onCloseClick(): void {
    this.dialogRef.close(true);
  }
}
