import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAssignmentDialogComponent } from './case-assignment-dialog.component';

describe('CaseAssignmentDialogComponent', () => {
  let component: CaseAssignmentDialogComponent;
  let fixture: ComponentFixture<CaseAssignmentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseAssignmentDialogComponent]
    });
    fixture = TestBed.createComponent(CaseAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
