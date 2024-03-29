import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Assignment, CaseInfo } from 'src/app/models';
import { SaveChangesDialogComponent } from '../../dialog/save-changes-dialog/save-changes-dialog.component';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent {
  @Input() caseAssignment!: Assignment;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  
  caseInfo: CaseInfo | undefined;
  completed: boolean = false; // for marking case as complete after form submission
  initialFormValues: any = {}; // for checking if changes have been made

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
    const formValues: any = {};
    // Populate the formValues object with the caseInfo properties
    this.caseInfo = this.caseAssignment.info;
    if (this.caseInfo) {
      formValues.patientName = this.caseInfo.patientName || '';
      formValues.patientGender = this.caseInfo.patientGender || '';
      formValues.patientAge = this.caseInfo.patientAge || '';
      formValues.medicalHistory = this.caseInfo.medicalHistory || '';
      formValues.familyHistory = this.caseInfo.familyHistory || '';
      formValues.chiefComplaint = this.caseInfo.chiefComplaint || '';
      formValues.symptoms = this.caseInfo.symptoms || '';
      formValues.hpi = this.caseInfo.hpi || '';
      formValues.physicalExaminationNotes = this.caseInfo.physicalExaminationNotes || '';
      formValues.labDiagnosticsNotes = this.caseInfo.labDiagnosticsNotes || '';
      formValues.additionalNotes = this.caseInfo.additionalNotes || '';
      this.initialFormValues = {...formValues};
    }
  
    this.caseInfoForm.setValue(formValues);
  }

  private hasFormChanges(): boolean {
    return JSON.stringify(this.caseInfoForm.value) !== JSON.stringify(this.initialFormValues);
  }
  
  saveDraft() {
    // Save form data without marking case as complete
    this.completed = false;
    this.onSubmit();
  }

  submitForReview() {
    // Confirm submit
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirm Case Submission',
        content: 'Are you sure you want to submit this case for review? This action cannot be undone.',
        confirmText: 'Submit',
      }
    });

    dialogRef.afterClosed().subscribe(submit => {
      if (submit) {
        // Save form data and mark case as complete
        this.completed = true;
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    const submitData = {
      formData: this.caseInfoForm.value,
      completed: this.completed,
    }
    this.formSubmitted.emit(submitData);
  }

  onClose() {
    if (this.hasFormChanges()) {
      const dialogRef = this.dialog.open(SaveChangesDialogComponent, {
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe(saveChanges => {
        if (saveChanges === undefined) { // User canceled or clicked outside of dialog
          return;
        } else if (saveChanges === true) {
          this.saveDraft();
        } else {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.router.navigate(['/home']); // No changes, navigate directly
    }
  }  
}