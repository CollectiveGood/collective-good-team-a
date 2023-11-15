import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignmentViewComponent } from './admin-assignment-view.component';

describe('AdminAssignmentViewComponent', () => {
  let component: AdminAssignmentViewComponent;
  let fixture: ComponentFixture<AdminAssignmentViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAssignmentViewComponent]
    });
    fixture = TestBed.createComponent(AdminAssignmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
