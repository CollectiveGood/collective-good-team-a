import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseViewDialogComponent } from './case-view-dialog.component';

describe('CaseViewDialogComponent', () => {
  let component: CaseViewDialogComponent;
  let fixture: ComponentFixture<CaseViewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseViewDialogComponent]
    });
    fixture = TestBed.createComponent(CaseViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
