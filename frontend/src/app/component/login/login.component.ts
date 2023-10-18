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
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email == '' || this.password == '') {
      window.alert("Please enter your email and password.");
      return;
    }
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status == 200) {
          console.log('Login successful: ', response);
          this.router.navigate(['/home']);
        }
        else {
          window.alert("Login unsuccessful. Please check your credentials.")
        }
      },
      error: (e) => {
        this.loading = false;
        console.log(e);
        window.alert("An error occurred when logging in.");
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}