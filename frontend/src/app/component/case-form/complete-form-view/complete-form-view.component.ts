import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Assignment, CaseInfo } from 'src/app/models';

@Component({
  selector: 'app-complete-form-view',
  templateUrl: './complete-form-view.component.html',
  styleUrls: [
    './complete-form-view.component.css', 
    '../reviewer-form-view/reviewer-form-view.component.css',
    '../form-view/form-view.component.css'
  ]
})
export class CompleteFormViewComponent {
  @Input() caseAssignment!: Assignment;

  caseInfo: CaseInfo | undefined;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.caseAssignment && this.caseAssignment.info) {
      this.caseInfo = this.caseAssignment.info;
    } else {
      this.router.navigate(['/cases/completed']);
      this.snackBar.open('Case not found', 'Close', {
        duration: 3000,
      });
    }
  }
}
