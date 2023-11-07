import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment, GetAssignmentsRequest, UpdateAssignmentRequest } from 'src/app/models';
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
    // Use caseHash to fetch and render the PDF for the selected case
    this.caseService.getCaseAsPDF(this.caseHash).subscribe({
      next: (response: Blob) => {
        this.caseBlob = response;
      },
      error: (e) => {
        console.error('Get case failed: ', e);
      },
      complete: () => {
        if (this.caseBlob === undefined) {
          this.snackBar.open('Failed to retrieve case information', 'Close', {
            duration: 3000,
          });
        }
      }
    });

    // Retrieve case information for selected case
    this.assignmentService.getAssignedCases().subscribe({
      next: (response: Assignment[]) => {
        // Find the assignment with the matching hash
        this.caseAssignment = response.find(assignment => assignment.hash === this.caseHash) || null;
        console.log(this.caseAssignment);
      },
      error: (e) => {
        console.error('Failed to retrieve case information: ', e);
      },
      complete: () => {
        if (this.caseAssignment === undefined) {
          this.snackBar.open('Failed to retrieve case information', 'Close', {
            duration: 3000,
          });
        }
      }
    });
  }

  updateCaseInfo(formData: any) {
    console.log(formData);

    const updateAssignmentRequest: UpdateAssignmentRequest = {
      json: formData,
      caseId: this.caseHash,
      userId: this.caseAssignment?.userId || 0,
      completed: false,
    };
  
    // Update the case info for the selected case
    this.assignmentService.updateAssignment(updateAssignmentRequest).subscribe({
      next: (response: Assignment) => {
        console.log(response);
        this.snackBar.open('Case information submitted successfully!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.error('Failed to update case information: ', e);
      }
    });
  }
}
