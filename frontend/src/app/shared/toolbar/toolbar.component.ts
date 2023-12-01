import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/component/dialog/confirmation-dialog/confirmation-dialog.component';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  activeUser: User | null = null;

  constructor(private userService: UserService, 
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser()?.subscribe((user) => {
      this.activeUser = user;
    });
  }

  onClickLogout() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Log Out',
        content: 'Are you sure you want to log out?',
        confirmText: 'Log Out'
      }
    });

    dialogRef.afterClosed().subscribe(confirmLogOut => {
      if (confirmLogOut) {
        this.authService.logout().subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/login']);
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }
}