import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCaseDeleteDialogComponent } from './confirm-case-delete-dialog.component';

describe('ConfirmCaseDeleteDialogComponent', () => {
  let component: ConfirmCaseDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmCaseDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmCaseDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmCaseDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
