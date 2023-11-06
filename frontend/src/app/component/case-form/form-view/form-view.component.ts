import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CaseInfo } from 'src/app/models';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent {

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  
  submitted: boolean = false;
  caseInfoForm = this.formBuilder.group({
    patientName: '',
    patientGender: '',
    patientAge: null,
    medicalHistory: '',
    familyHistory: '',
    chiefComplaint: '',
    symptoms: '',
    hpi: '',
    physicalExaminationNotes: '',
    labDiagnosticsNotes: '',
    additionalNotes: '',
  });

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() {
    const formData = this.caseInfoForm.value;
    this.formSubmitted.emit(formData);
  }
}
