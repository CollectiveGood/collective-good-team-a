import { Component, OnInit } from '@angular/core';
import { Assignment, User } from 'src/app/models';
import { Router } from '@angular/router';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // assignedCases: Assignment[] | null = null;
  newAssignedCases: Assignment[] | null = null;
  casesToReview: Assignment[] | null = null;
  submittedCases: Assignment[] | null = null;
  completedCases: Assignment[] | null = null;
  loading: boolean = false;

  constructor(
    private router: Router, 
    private assignmentService: AssignmentService
    ) {
  }

  ngOnInit(): void {
    // Retrieve assigned cases
    this.getNewAssignedCases();
    this.getSubmittedCases();
    this.getCasesToReview();
  }

  private getNewAssignedCases(): void {
    // Retrieve list of assigned cases
    this.loading = true;
    this.assignmentService.getNewAssignedCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none assigned, set to null
          return;
        }
        this.newAssignedCases = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private getCasesToReview(): void {
    // Retrieve list of cases to review
    this.loading = true;
    this.assignmentService.getCasesToReview().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none to review, set to null
          return;
        }
        this.casesToReview = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private getSubmittedCases(): void {
    // Retrieve list of submitted cases
    this.loading = true;
    this.assignmentService.getSubmittedCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none submitted, set to null
          return;
        }
        this.submittedCases = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private getCompletedCases(): void {
    // Retrieve list of completed cases
    this.loading = true;
    this.assignmentService.getCompletedCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none completed, set to null
          return;
        }
        this.completedCases = response;
        console.log(response);
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
