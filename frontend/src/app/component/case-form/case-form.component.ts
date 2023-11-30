import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { VIEW_MODE } from 'src/app/constants';
import { Assignment, ReviewAssignmentRequest, UpdateAssignmentRequest } from 'src/app/models';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css']
})
export class CaseFormComponent {
  assignmentId!: number;
  caseAssignment!: Assignment;
  caseBlob!: Blob;
  viewMode!: VIEW_MODE;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private caseService: CaseService, 
    private assignmentService: AssignmentService,
    private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.assignmentId = params['id']; // fetch and render the PDF for the selected case
      this.viewMode = params['viewMode']; // Select the view mode based on the URL
    });
  }

  ngOnInit(): void {
    this.assignmentService.getAssignment(this.assignmentId).subscribe({
      next: (response: Assignment) => {
        this.caseAssignment = response;
        if (this.caseAssignment === null) {
          this.snackBar.open('Failed to retrieve case information', 'Close');
        }
      },
      error: (e: HttpErrorResponse) => {
        console.error('Failed to retrieve case information: ', e);
        this.snackBar.open(`An error occurred while retrieving case information: ${e.status} ${e.statusText}`, 'Close');
      },
      complete: () => {
        if (this.caseAssignment === undefined) {
          this.snackBar.open('Failed to retrieve case information', 'Close');
        } else {
          this.getCaseFile(); // Fetch case assignment information
        }
      }
    });
  }

  /* Get the case information for the selected case */
  private getCaseFile(): void {
    // Retrieve cases depending on view mode
    this.caseService.getCaseAsPDF(this.caseAssignment.hash).subscribe({
      next: (response: any) => {
        this.caseBlob = response;
      },
      error: (e: HttpErrorResponse) => {
        console.error('Failed to retrieve case information: ', e);
        this.snackBar.open(`An error occurred while retrieving case information: ${e.status} ${e.statusText}`, 'Close');
      }
    });
  }

  /* Save or submit case information (based on completed flag) */
  updateCaseInfo(data: any) {
    const updateAssignmentRequest: UpdateAssignmentRequest = {
      json: data.formData,
      caseId: this.caseAssignment.hash,
      userId: this.caseAssignment?.userId || 0,
      completed: data.completed,
    };
  
    // Update the case info for the selected case
    this.assignmentService.updateAssignment(updateAssignmentRequest).subscribe({
      next: (response: Assignment) => {
        console.log(response);
        if (data.completed) {
          this.snackBar.open('Case information submitted successfully!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Case information saved successfully!', 'Close', {
            duration: 3000,
          });
        }
        this.router.navigate(['/home']);
      },
      error: (e: HttpErrorResponse) => {
        console.error('Failed to update case information: ', e);
        this.snackBar.open(`An error occurred while updating case information: ${e.status} ${e.statusText}`, 'Close');
      }
    });
  }

  /* Save or submit case review (based on resolved flag) */
  submitCaseReview(data: { comments: [string, string][], resolved: boolean }) {
    const jsonFormatted = Object.fromEntries(data.comments);
  
    const reviewAssignmentRequest: ReviewAssignmentRequest = {
      caseId: this.caseAssignment.hash,
      userId: this.caseAssignment?.userId || 0,
      resolved: data.resolved,
      json: jsonFormatted,
    };
  
    this.assignmentService.submitReview(reviewAssignmentRequest).subscribe({
      next: (response: Assignment) => {
        console.log(response);
        if (!data.resolved) {
          this.snackBar.open('Case review saved successfully!', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Case review submitted successfully!', 'Close', {
            duration: 3000,
          });
        }
        this.router.navigate(['/home']);
      },
      error: (e: HttpErrorResponse) => {
        console.error('Failed to submit case review: ', e);
        this.snackBar.open(`An error occurred while submitting case review: ${e.status} ${e.statusText}`, 'Close');
      }
    });
  }
  
  
}
