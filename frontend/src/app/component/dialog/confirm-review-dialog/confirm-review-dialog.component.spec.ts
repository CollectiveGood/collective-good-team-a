import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReviewDialogComponent } from './confirm-review-dialog.component';

describe('ConfirmReviewDialogComponent', () => {
  let component: ConfirmReviewDialogComponent;
  let fixture: ComponentFixture<ConfirmReviewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmReviewDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
