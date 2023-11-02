import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaseViewComponent } from './admin-case-view.component';

describe('AdminCaseViewComponent', () => {
  let component: AdminCaseViewComponent;
  let fixture: ComponentFixture<AdminCaseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCaseViewComponent]
    });
    fixture = TestBed.createComponent(AdminCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
