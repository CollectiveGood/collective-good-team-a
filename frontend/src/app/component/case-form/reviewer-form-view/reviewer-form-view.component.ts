import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment, CaseInfo } from 'src/app/models';
import { SaveChangesDialogComponent } from '../../dialog/save-changes-dialog/save-changes-dialog.component';

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
  commentActive: string = ''; // for toggling comment section
  initialFormValues: any = {}; // for checking if changes have been made
  step: number = 0; // for expanding/collapsing the form sections

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
  
    const formValues: any = {};
    if (this.caseInfo && this.caseAssignment.review) { 
      formValues.patientName = this.caseAssignment.review?.patientName || '';
      formValues.patientGender = this.caseAssignment.review?.patientGender || '';
      formValues.patientAge = this.caseAssignment.review?.patientAge || '';
      formValues.medicalHistory = this.caseAssignment.review?.medicalHistory || '';
      formValues.familyHistory = this.caseAssignment.review?.familyHistory || '';
      formValues.chiefComplaint = this.caseAssignment.review?.chiefComplaint || '';
      formValues.symptoms = this.caseAssignment.review?.symptoms || '';
      formValues.hpi = this.caseAssignment.review?.hpi || '';
      formValues.physicalExamination = this.caseAssignment.review?.physicalExamination || '';
      formValues.labDiagnostics = this.caseAssignment.review?.labDiagnostics || '';
      formValues.additionalNotes = this.caseAssignment.review?.additionalNotes || '';
      this.initialFormValues = {...formValues};
    }

    this.reviewerInfoForm.setValue(formValues);
  }
  
  onClose(): void {
    if (this.hasFormChanges()) {
      const dialogRef = this.dialog.open(SaveChangesDialogComponent, {
        width: '300px',
      });

      dialogRef.afterClosed().subscribe(saveChanges => {
        if (saveChanges === undefined) {
          return;
        } else if (saveChanges === true){
          this.saveDraft();
        } else {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  private hasFormChanges() {
    return JSON.stringify(this.reviewerInfoForm.value) !== JSON.stringify(this.initialFormValues);
  }

  saveDraft(): void {
    const dataToSubmit = {
      comments: Array.from(this.reviewerComments.entries()),
      resolved: undefined,
    }
    this.formSubmitted.emit(dataToSubmit);
  }

  onSubmit(): void {
    const dataToSubmit = {
      comments: Array.from(this.reviewerComments.entries()),
      resolved: true,
    }
    this.formSubmitted.emit(dataToSubmit);
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
  }

  // For expanding/collapsing the form sections
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
