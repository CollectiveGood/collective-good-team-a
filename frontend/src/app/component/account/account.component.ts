import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  constructor(private authService: AuthService, private router: Router) { }

  userDetails: User | null = null;
  showPassword: boolean = false;

  ngOnInit(): void {
    // Check authentication
    if (!this.authService.checkAuthentication()) {
      this.router.navigate(['/login']);
    }

    // Retrieve account details
    this.authService.getUser()?.subscribe(userDetails => {
      this.userDetails = userDetails;
    });
  }
}
