import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Validate input
    if (this.name == '' || this.email == '' || this.password == '' || this.passwordConfirm == '') {
      window.alert("Please fill out all fields.");
      return;
    }
    if (this.password != this.passwordConfirm) {
      window.alert("Passwords do not match.");
      return;
    }
    // Create account
    this.authService.signUp(this.email, this.name, this.password).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          console.log('Account creation successful: ', response);
          window.alert('Account successfully created!');
          this.router.navigate(['/login']);
        }
        else {
          window.alert("Account creation unsuccessful. Please check your credentials.")
        }
      },
      error: (e) => {
        console.log(e);
        window.alert("An error occurred when creating your account.");
      }
    })
  }
}