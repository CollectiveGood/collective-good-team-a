import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserRoleUpdateComponent } from './confirm-user-role-update.component';

describe('ConfirmUserRoleUpdateComponent', () => {
  let component: ConfirmUserRoleUpdateComponent;
  let fixture: ComponentFixture<ConfirmUserRoleUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmUserRoleUpdateComponent]
    });
    fixture = TestBed.createComponent(ConfirmUserRoleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
