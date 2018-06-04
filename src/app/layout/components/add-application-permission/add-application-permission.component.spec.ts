import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationPermissionComponent } from './add-application-permission.component';

describe('AddApplicationPermissionComponent', () => {
  let component: AddApplicationPermissionComponent;
  let fixture: ComponentFixture<AddApplicationPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddApplicationPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
