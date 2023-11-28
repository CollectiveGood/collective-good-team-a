import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Assignment, CaseInfo } from 'src/app/models';

@Component({
  selector: 'app-reviewer-form-view',
  templateUrl: './reviewer-form-view.component.html',
  styleUrls: ['./reviewer-form-view.component.css', '../form-view/form-view.component.css']
})
export class ReviewerFormViewComponent {
  @Input() caseAssignment!: Assignment;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  caseInfo: CaseInfo | undefined;
  reviewerInfo: any = {}; // for storing reviewer comments
  reviewed: boolean = false; // for marking case as complete after form submission
  commentActive: string = ''; // for toggling comment section

  // Form values
  caseFormValues: any = {};
  reviewerFormValues: any = {};

  caseInfoForm = this.formBuilder.group({
    patientName: '',
    patientGender: '',
    patientAge: '',
    medicalHistory: '',
    familyHistory: '',
    chiefComplaint: '',
    symptoms: '',
    hpi: '',
    physicalExaminationNotes: '',
    labDiagnosticsNotes: '',
    additionalNotes: '',
  });

  reviewerInfoForm = this.formBuilder.group({
    demographicComments: '',
    historyComments: '',
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
    // Populate the formValues object with the caseInfo properties
    if (this.caseInfo) {
      this.caseFormValues = this.caseInfo;
    }
    this.caseInfoForm.setValue(this.caseFormValues);

    this.reviewerInfo = this.caseAssignment.review;
    // Populate the formValues object with the reviewerInfo properties
    if (this.reviewerInfo) {
      this.caseFormValues = this.reviewerInfo;
    }
    this.reviewerInfoForm.setValue(this.reviewerFormValues);
  }

  onClose(): void {
    // Placeholder - handle saving comments changes logic later
    this.router.navigate(['/home']);
  }

  saveDraft(): void {}

  onSubmit(): void {}

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
}
