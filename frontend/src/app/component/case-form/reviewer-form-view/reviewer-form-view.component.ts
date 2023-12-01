import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment, CaseInfo } from 'src/app/models';
import { SaveChangesDialogComponent } from '../../dialog/save-changes-dialog/save-changes-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reviewer-form-view',
  templateUrl: './reviewer-form-view.component.html',
  styleUrls: ['./reviewer-form-view.component.css', '../form-view/form-view.component.css']
})
export class ReviewerFormViewComponent {
  @Input() caseAssignment!: Assignment;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  caseInfo: CaseInfo | undefined;
  reviewerComments!: Map<string, string>;
  reviewed: boolean = false; // for marking case as reviewed after form submission
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
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.reviewerComments = new Map<string, string>(Object.entries(this.caseAssignment?.review ?? {}));
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

  saveDraft(): void {
    // Save comments for changed fields
    Object.keys(this.initialFormValues).forEach(fieldId => {
      if (this.hasFormFieldChanges(fieldId)) {
        const commentText = this.reviewerInfoForm.get(fieldId)?.value || '';
        this.postComment(fieldId, commentText);
      }
    });
  
    this.onSubmit(false);
  }

  submitReview(): void {
    // Confirm submission
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { 
      width: '300px' ,
      data: {
        title: 'Confirm Case Review',
        content: 'Are you sure you want to submit this review? This action cannot be undone.',
        confirmText: 'Submit',
      }
    });

    dialogRef.afterClosed().subscribe(submit => {
      if (submit) {
        this.onSubmit(true);
      }
    });
  }

  onSubmit(reviewed: boolean): void {
    console.log(this.reviewerComments);
    const  submitData = {
      comments: Array.from(this.reviewerComments.entries()),
      resolved: reviewed,
    }
    this.formSubmitted.emit(submitData);
  }

  /* Comment handling logic */

  toggleComment(field: string): void {
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

  resetCommentActive(panelIndex: number): void {
    // Reset the commentActive variable when a panel is closed
    if (this.step !== panelIndex) {
      this.commentActive = '';
    }
  }

  postComment(fieldId: string, commentText: string): void {
    // Set or overwrite the comment if it already exists
    this.reviewerComments.set(fieldId, commentText);
    this.snackBar.open('Comment saved successfully!', 'Close', {
      duration: 3000,
    });
  }

  /* For expanding/collapsing the form sections */
  
  setStep(index: number): void {
    this.step = index;
  }

  nextStep(): void {
    this.step++;
  }

  prevStep(): void {
    this.step--;
  }

  /* For checking if changes have been made */

  private hasFormChanges(): boolean {
    // Check if any field has changes
    return JSON.stringify(this.reviewerInfoForm.value) !== JSON.stringify(this.initialFormValues);
  }

  hasFormFieldChanges(fieldId: string): boolean {
    // Check if a specific field has changes
    return this.reviewerInfoForm.get(fieldId)?.value !== this.initialFormValues[fieldId];
  }

  hasSubmittedComment(field: string): boolean {
    return this.reviewerComments.has(field) && this.reviewerComments.get(field)?.trim() !== '';
  }
}
