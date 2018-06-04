import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserRoleComponent } from './remove-user-role.component';

describe('RemoveUserRoleComponent', () => {
  let component: RemoveUserRoleComponent;
  let fixture: ComponentFixture<RemoveUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveUserRoleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
