import { Component, OnInit } from '@angular/core';
import { Assignment, User } from 'src/app/models';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newAssignedCases: Assignment[] | null = null;
  pendingCases: Assignment[] | null = null;
  completedCases: Assignment[] | null = null;
  loading: boolean = false;
  user: User | null = null;

  constructor(
    private router: Router, 
    private assignmentService: AssignmentService
    ) {
  }

  ngOnInit(): void {
    // Set case assignment lists
    this.getNewAssignedCases();
    this.getPendingCases();
    this.getCompletedCases();
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

  private getPendingCases(): void {
    // Retrieve list of pending cases
    this.loading = true;
    this.assignmentService.getPendingCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none pending, set to null
          return;
        }
        this.pendingCases = response;
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
