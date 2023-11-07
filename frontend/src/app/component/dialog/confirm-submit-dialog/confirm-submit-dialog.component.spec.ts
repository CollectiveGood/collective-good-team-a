import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSubmitDialogComponent } from './confirm-submit-dialog.component';

describe('ConfirmSubmitDialogComponent', () => {
  let component: ConfirmSubmitDialogComponent;
  let fixture: ComponentFixture<ConfirmSubmitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmSubmitDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmSubmitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
