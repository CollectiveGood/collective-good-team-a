import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteFormViewComponent } from './complete-form-view.component';

describe('CompleteFormViewComponent', () => {
  let component: CompleteFormViewComponent;
  let fixture: ComponentFixture<CompleteFormViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteFormViewComponent]
    });
    fixture = TestBed.createComponent(CompleteFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
