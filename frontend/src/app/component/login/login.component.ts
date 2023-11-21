import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService: AuthService, 
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Navigate to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.email == '' || this.password == '') {
      this.snackBar.open("Please enter your email and password.", "Close", { duration: 3000 });
      return;
    }
    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Login successful: ', response);
        this.router.navigate(['/home']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if (e.status === 401) {
          this.snackBar.open("The username or password is incorrect.", "Close", { duration: 3000 });
          return;
        }
        console.log(e);
        this.snackBar.open("An error occurred while logging in.", "Close", { duration: 3000 });
      },
      complete: () => {
        this.loading = false;
        this.snackBar.dismiss();
      }
    })
  }
}