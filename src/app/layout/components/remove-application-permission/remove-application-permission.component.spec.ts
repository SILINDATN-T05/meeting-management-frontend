import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveApplicationPermissionComponent } from './remove-application-permission.component';

describe('RemoveApplicationPermissionComponent', () => {
  let component: RemoveApplicationPermissionComponent;
  let fixture: ComponentFixture<RemoveApplicationPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveApplicationPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveApplicationPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
