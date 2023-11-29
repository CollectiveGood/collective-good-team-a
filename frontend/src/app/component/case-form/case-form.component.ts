import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, ReviewAssignmentRequest, UpdateAssignmentRequest } from 'src/app/models';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css']
})
export class CaseFormComponent {
  caseHash: string = '';
  caseBlob!: Blob;
  caseAssignment: Assignment | null = null;
  isReviewMode: boolean = false;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private caseService: CaseService, 
    private assignmentService: AssignmentService,
    private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.caseHash = params['hash']; // fetch and render the PDF for the selected case
    });
  }

  ngOnInit(): void {
    // Check whether to render review mode
    if (this.router.url.split('/')[1] === "review") { this.isReviewMode = true} 
    else { this.isReviewMode = false }
    // Use caseHash to fetch and render the PDF for the selected case
    this.caseService.getCaseAsPDF(this.caseHash).subscribe({
      next: (response: Blob) => {
        this.caseBlob = response;
      },
      error: (e: HttpErrorResponse) => {
        console.error('Get case failed: ', e);
        this.snackBar.open(`An error occurred while retrieving case information: ${e.status} ${e.statusText}`, 'Close');
      },
      complete: () => {
        if (this.caseBlob === undefined) {
          this.snackBar.open('Failed to retrieve case information', 'Close');
        } else {
          this.getCaseInfo(); // Fetch case assignment information
        }
      }
    });
  }

  /* Get the case information for the selected case */
  private getCaseInfo(): void {
    // Check whether to render review mode
    const handler = this.isReviewMode ? this.assignmentService.getReview(this.caseHash) : this.assignmentService.getAssignment(this.caseHash);
    handler.subscribe({
      next: (response: Assignment) => {
        this.caseAssignment = response;
        if (this.caseAssignment === null) {
          this.snackBar.open('Failed to retrieve case information', 'Close');
        }
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
      caseId: this.caseHash,
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
      caseId: this.caseHash,
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
