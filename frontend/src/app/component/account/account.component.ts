import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { MatDialog } from '@angular/material/dialog';
import { PasswordConfirmationDialogComponent } from '../dialog/password-confirmation-dialog/password-confirmation-dialog.component';
import { PasswordChangeDialogComponent } from '../dialog/password-change-dialog/password-change-dialog.component';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  userDetails: User | null = null;

  ngOnInit(): void {
    // Retrieve account details
    this.userService.getUser()?.subscribe(userDetails => {
      this.userDetails = userDetails;
    });
  }

  openPasswordConfirmationDialog(): void {
    const dialogRef = this.dialog.open(PasswordConfirmationDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: Update profile
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
