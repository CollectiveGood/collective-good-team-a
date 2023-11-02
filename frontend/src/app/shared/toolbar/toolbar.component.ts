import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmLogoutDialogComponent } from 'src/app/component/dialog/confirm-logout-dialog/confirm-logout-dialog.component';
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

  constructor(
    private userService: UserService,
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService.getUser()?.subscribe((user) => {
      this.activeUser = user;
    });
  }

  
  clickLogout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '300px',
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