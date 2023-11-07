import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CaseInfo } from 'src/app/models';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent {
  @Input() caseInfo: CaseInfo | undefined;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  
  completed: boolean = false;
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

  constructor(private formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    const formValues: any = {};
    // Populate the formValues object with the caseInfo properties
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
    }
  
    this.caseInfoForm.setValue(formValues);
  }
  
  saveDraft() {
    // Save form data without marking case as complete
    this.completed = false;
    this.onSubmit();
  }

  submitForReview() {
    // Save form data and mark case as complete
    this.completed = true;
    this.onSubmit();
  }

  onSubmit() {
    const submitData = {
      formData: this.caseInfoForm.value,
      completed: this.completed,
    }
    this.formSubmitted.emit(submitData);
  }
}
