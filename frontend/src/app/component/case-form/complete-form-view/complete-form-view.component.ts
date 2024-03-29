import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Assignment, CaseInfo } from 'src/app/models';
import { FIELD_NAMES_MAP } from 'src/app/constants';

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
  reviewComments: [string, string][] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.caseAssignment && this.caseAssignment.info) {
      this.caseInfo = this.caseAssignment.info;
      this.reviewComments = Object.entries(this.caseAssignment.review);

      console.log(this.caseAssignment);

    } else {
      this.router.navigate(['/cases/completed']);
      this.snackBar.open('Case not found', 'Close', {
        duration: 3000,
      });
    }
  }

  onClose(): void {
    this.router.navigate(['/cases/completed']);
  }

  formatFieldName(fieldName: string): string {
    // Use the map to get the formatted field name
    return FIELD_NAMES_MAP.get(fieldName) || fieldName;
  }
}
