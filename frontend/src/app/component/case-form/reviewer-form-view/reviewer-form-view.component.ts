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
  reviewed: boolean = false; // for marking case as complete after form submission
  formValues: any = {}; // for checking if changes have been made
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
      this.formValues = this.caseInfo;
    }
    this.caseInfoForm.setValue(this.formValues);
  }

  onClose(): void {
    // Placeholder - handle saving comments changes logic later
    this.router.navigate(['/home']);
  }

  saveDraft(): void {}

  onSubmit(): void {}
}
