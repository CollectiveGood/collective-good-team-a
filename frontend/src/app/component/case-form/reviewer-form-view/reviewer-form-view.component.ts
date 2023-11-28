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
  reviewerComments: ReviewComment[] = []; // for storing reviewer comments
  reviewed: boolean = false; // for marking case as complete after form submission
  commentActive: string = ''; // for toggling comment section
  
  // Form values
  caseFormValues: any = {};
  reviewerFormValues: any = {};

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
    // this.reviewerInfo = this.caseAssignment.review;
    // // Populate the formValues object with the reviewerInfo properties
    // if (this.reviewerInfo) {
    //   this.caseFormValues = this.reviewerInfo;
    // }
    // this.reviewerInfoForm.setValue(this.reviewerFormValues);
  }

  onClose(): void {
    // Placeholder - handle saving comments changes logic later
    this.router.navigate(['/home']);
  }

  saveDraft(): void {}

  onSubmit(): void {
    this.reviewed = true;
    this.formSubmitted.emit();
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

  toggleComment(field: string) {
    if (this.commentActive === field) {
      this.commentActive = '';
    } else {
      this.commentActive = field;
    }
  }

  resetCommentActive(panelIndex: number) {
    // Reset the commentActive variable when a panel is closed
    if (this.step !== panelIndex) {
      this.commentActive = '';
    }
  }

  postComment(fieldId: string, commentText: string) {
    this.reviewerComments.push({ fieldId, commentText });
    console.log(this.reviewerComments);
  }
}
