import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { PasswordConfirmationDialogComponent } from '../dialog/password-confirmation-dialog/password-confirmation-dialog.component';
import { PasswordChangeDialogComponent } from '../dialog/password-change-dialog/password-change-dialog.component';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css' ]
})
export class AccountComponent {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  userDetails!: User;
  initialUserDetails!: User; // track changes to user details
  formChanged: boolean = false;

  ngOnInit(): void {
    // Retrieve account details
    this.userService.getUser()?.subscribe(userDetails => {
      this.userDetails = userDetails;
      this.initialUserDetails = { ...userDetails }; // make copy of initial user details
    });
  }

  onInputChange(): void {
    // Check if the form values are different from the initial values
    this.formChanged = (
      this.userDetails.name !== this.initialUserDetails.name ||
      this.userDetails.email !== this.initialUserDetails.email
    );
  }

  onSubmit(): void {
    // Validate input
    if (this.userDetails === null) return;
    if (this.userDetails?.email === '' || this.userDetails?.name === '') {
      this.snackBar.open('Please fill out all fields.', 'Close', { duration: 3000 });
      return;
    } else if (!this.authService.isEmailValid(this.userDetails?.email)) {
      this.snackBar.open('Please enter a valid email address.', 'Close', { duration: 3000 });
      return;
    } else {
      this.openPasswordConfirmationDialog();
    }
  }

  openPasswordConfirmationDialog(): void {
    let dialogRef = this.dialog.open(PasswordConfirmationDialogComponent, {
      width: '400px',
      data: { userDetails: this.userDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.snackBar.open(result, 'Close', { duration: 3000 });
        if (result === 'Your credentials have been updated successfully!') {
          this.initialUserDetails = { ...this.userDetails }; // update initial user details
          this.formChanged = false;
        }
      }
    });
  }

  openPasswordChangeDialog(): void {
    let dialogRef = this.dialog.open(PasswordChangeDialogComponent, {
      width: '400px',
      data: { userDetails: this.userDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.snackBar.open(result, 'Close', { duration: 3000 });
      }
    });
  }
}
