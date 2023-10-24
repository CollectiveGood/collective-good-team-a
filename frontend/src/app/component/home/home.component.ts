import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Case } from 'src/app/model/case.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cases: Case[] | null = null;
  
  constructor(private caseService: CaseService, 
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    // Check authentication
    this.authService.checkAuthentication().subscribe({
      next: (isAuthenticated: boolean) => {
        console.log("Authenticated: ", isAuthenticated);
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
        }
      },
      error: (e) => {
        if (e.status === 401) {
          this.router.navigate(['/login']);
        }
        console.log(e);
      }
    });

    // Retrieve list of cases
    // this.caseService.getAllCases()?.subscribe({
    //   next: (response) => {
    //     // console.log(response);
    //     this.cases = response;
    //   },
    //   error: (e) => {
    //     console.log(e);
    //   }
    // });
  }
}
