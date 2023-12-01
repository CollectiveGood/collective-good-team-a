import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerFormViewComponent } from './reviewer-form-view.component';

describe('ReviewerFormViewComponent', () => {
  let component: ReviewerFormViewComponent;
  let fixture: ComponentFixture<ReviewerFormViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewerFormViewComponent]
    });
    fixture = TestBed.createComponent(ReviewerFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
