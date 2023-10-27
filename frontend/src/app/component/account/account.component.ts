import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { PasswordConfirmationDialogComponent } from '../dialog/password-confirmation-dialog/password-confirmation-dialog.component';
import { PasswordChangeDialogComponent } from '../dialog/password-change-dialog/password-change-dialog.component';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
  ) { }

  userDetails: User | null = null;
  
  ngOnInit(): void {
    // Retrieve account details
    this.userService.getUser()?.subscribe(userDetails => {
      this.userDetails = userDetails;
    });
  }

  ngOnChanges(): void {
    this.userService.getUser()?.subscribe(userDetails => {
      this.userDetails = userDetails;
    });
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
