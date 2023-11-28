import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment, CaseInfo, ReviewComment } from 'src/app/models';

@Component({
  selector: 'app-reviewer-form-view',
  templateUrl: './reviewer-form-view.component.html',
  styleUrls: ['./reviewer-form-view.component.css', '../form-view/form-view.component.css']
})
export class ReviewerFormViewComponent {
  @Input() caseAssignment!: Assignment;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  caseInfo: CaseInfo | undefined;
  reviewerComments: Map<string, string> = new Map();
  reviewed: boolean = false; // for marking case as complete after form submission
  commentActive: string = ''; // for toggling comment section
  
  // Form values
  reviewerFormValues: any = {};

  // For adding comments
  reviewerInfoForm = this.formBuilder.group({
    patientName: '',
    patientGender: '',
    patientAge: '',
    medicalHistory: '',
    familyHistory: '',
    chiefComplaint: '',
    symptoms: '',
    hpi: '',
    physicalExamination: '',
    labDiagnostics: '',
    additionalNotes: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.caseInfo = this.caseAssignment.info;
  }

  onClose(): void {
    // Placeholder - handle saving comments changes logic later
    this.router.navigate(['/home']);
  }

  saveDraft(): void {}

  onSubmit(): void {
    this.reviewed = true;
    const dataToSubmit = {
      comments: Array.from(this.reviewerComments.entries()),
      resolved: this.reviewed,
    }
    this.formSubmitted.emit(dataToSubmit);
  }

  // For expanding/collapsing the form sections
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  /* Comment handling logic */

  toggleComment(field: string) {
    const isOpeningNewComment = this.commentActive !== field;
  
    if (isOpeningNewComment) {
      // Close the current comment box if it's open
      this.commentActive = '';
      setTimeout(() => {
        this.commentActive = field;
      });
    } else {
      // Close the current comment box
      this.commentActive = '';
    }
  }

  resetCommentActive(panelIndex: number) {
    // Reset the commentActive variable when a panel is closed
    if (this.step !== panelIndex) {
      this.commentActive = '';
    }
  }

  postComment(fieldId: string, commentText: string) {
    // Set or overwrite the comment if it already exists
    this.reviewerComments.set(fieldId, commentText);
    console.log(this.reviewerComments);
  }
}
