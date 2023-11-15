import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Case, User } from 'src/app/models';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';
import { CaseService } from 'src/app/service/case/case.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-case-assignment-dialog',
  templateUrl: './case-assignment-dialog.component.html',
  styleUrls: ['./case-assignment-dialog.component.css']
})
export class CaseAssignmentDialogComponent {

  cases: Case[] | null = null;
  users: User[] | null = null;
  reviewer: User[] | null = null;
  selectedCase: Case | null = null;
  selectedUser: User | null = null;
  selectedReviewer: User | null = null;
  loading: boolean = false;

  constructor(
    private caseService: CaseService,
    private assignmentService: AssignmentService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CaseAssignmentDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.caseService.getAllCases().subscribe({
      next: (response) => {
        this.cases = response;
      },
      error: (e) => {
        console.error(e);
      }
    });

    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  onSubmit(): void {
    if (this.selectedCase === null || this.selectedUser === null || this.selectedReviewer === null) {
      return;
    }
    this.loading = true;
    this.assignmentService.assignCase(this.selectedUser.email, this.selectedReviewer.email, this.selectedCase.fileName).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close("This case has been assigned successfully!");
      },
      error: (e) => {
        if (e.status === 409) {
          this.snackBar.open("This case is already assigned to this user.", "Close", { duration: 3000 });
        }
        this.loading = false;
        console.error(e);
      },
      complete: () => {
        this.loading = false;
      }
    });    
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
