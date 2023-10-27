import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, 
              private router: Router,
              private snackBar: MatSnackBar) {}

  onSubmit(): void {
    // Validate input
    if (this.name == '' || this.email == '' || this.password == '' || this.passwordConfirm == '') {
      this.snackBar.open("Please fill out all fields.", "Close", { duration: 5000 });
      return;
    }
    if (!this.authService.isEmailValid(this.email)) {
      this.snackBar.open("Please enter a valid email address.", "Close", { duration: 5000 });
      return;
    }
    if (this.password != this.passwordConfirm) {
      this.snackBar.open("Passwords do not match.", "Close", { duration: 5000 });
      return;
    }
    if (this.password.length < 8) {
      this.snackBar.open("Password must be at least 8 characters long.", "Close", { duration: 5000 });
      return;
    }

    this.loading = true;
    // Create account
    this.authService.signUp(this.email, this.name, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        console.log('Account creation successful: ', response);
        this.snackBar.open("Account successfully created!", "Close", { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.loading = false;
        if (e.status === 409) {
          this.snackBar.open("An account with this email already exists. Please log in.", "Close", { duration: 5000 });
          return;
        }
        console.log(e);
        this.snackBar.open("An error occurred while creating your account.", "Close", { duration: 5000 });
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}