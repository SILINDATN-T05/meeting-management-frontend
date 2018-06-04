import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveRolePermisionDialogComponent } from './remove-role-permision-dialog.component';

describe('RemoveRolePermisionDialogComponent', () => {
  let component: RemoveRolePermisionDialogComponent;
  let fixture: ComponentFixture<RemoveRolePermisionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveRolePermisionDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveRolePermisionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
