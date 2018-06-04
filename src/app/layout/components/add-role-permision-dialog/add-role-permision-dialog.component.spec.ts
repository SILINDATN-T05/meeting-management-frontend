import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRolePermisionDialogComponent } from './add-role-permision-dialog.component';

describe('AddRolePermisionDialogComponent', () => {
  let component: AddRolePermisionDialogComponent;
  let fixture: ComponentFixture<AddRolePermisionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRolePermisionDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRolePermisionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
