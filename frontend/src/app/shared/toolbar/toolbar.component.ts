import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  activeUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser()?.subscribe((user) => {
      this.activeUser = user;
    });
  }

  clickLogout() {
    this.authService.logout().subscribe({
      next: (response) => {
        // this.router.navigate(['/login']);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}