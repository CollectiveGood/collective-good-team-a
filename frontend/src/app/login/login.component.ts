import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log('Login successful: ', response);
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
