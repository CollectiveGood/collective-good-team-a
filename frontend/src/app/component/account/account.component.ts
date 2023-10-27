import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { PasswordConfirmationDialogComponent } from '../dialog/password-confirmation-dialog/password-confirmation-dialog.component';
import { PasswordChangeDialogComponent } from '../dialog/password-change-dialog/password-change-dialog.component';
import { UserService } from 'src/app/service/user/user.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../../app.component.css']
})
export class AccountComponent {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  userDetails: User | null = null;
  errorMessage: string = '';

  ngOnInit(): void {
    // Retrieve account details
    this.userService.getUser()?.subscribe(userDetails => {
      this.userDetails = userDetails;
    });
  }

  onSubmit(): void {
    // Validate input
    if (this.userDetails === null) return;
    if (this.userDetails?.email === '' || this.userDetails?.name === '') {
      this.errorMessage = 'Please fill out all fields.';
      return;
    } else if (!this.authService.isEmailValid(this.userDetails?.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    } else {
      this.openPasswordConfirmationDialog();
    }
  }

  openPasswordConfirmationDialog(): void {
    const dialogRef = this.dialog.open(PasswordConfirmationDialogComponent, {
      width: '400px',
      data: { userDetails: this.userDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.userDetails) {
        this.userDetails.email = result.newEmail;
        this.userDetails.name = result.newName;
      }
    });
  }

  openPasswordChangeDialog(): void {
    const dialogRef = this.dialog.open(PasswordChangeDialogComponent, {
      width: '400px',
      data: { userDetails: this.userDetails }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    });
  }
}
