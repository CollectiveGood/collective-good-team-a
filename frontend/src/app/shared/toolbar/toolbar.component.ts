import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  activeUser: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser()?.subscribe((user) => {
      this.activeUser = user;
    });
  }

  clickLogout() {
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
}