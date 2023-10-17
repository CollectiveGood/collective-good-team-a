import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user) {
          console.log('Login successful: ', user);
          this.router.navigate(['/home']);
        }
        else {
          window.alert("Login unsuccessful. Please check your credentials.")
        }
      },
      error: (e) => {
        console.log(e);
        window.alert("An error occurred when logging in.");
      }
    })
  }
}