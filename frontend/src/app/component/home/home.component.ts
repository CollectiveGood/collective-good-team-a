import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/models';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  assignedCases: Assignment[] | null = null;
  loading: boolean = false;
  
  constructor( private router: Router, private caseService: CaseService) {}

  ngOnInit(): void {
    // Retrieve list of assigned cases
    this.loading = true;
    this.caseService.getAssignedCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none assigned, set to null
          return;
        }
        this.assignedCases = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  //Sojin
  // Handle button click
  caseClick(assignedCase: Assignment) {
    this.router.navigate([`/case/${assignedCase.hash}`])
  }
}
