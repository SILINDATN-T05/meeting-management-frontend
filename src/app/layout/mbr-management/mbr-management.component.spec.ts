import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MbrManagementComponent } from './mbr-management.component';

describe('MbrManagementComponent', () => {
  let component: MbrManagementComponent;
  let fixture: ComponentFixture<MbrManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MbrManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MbrManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
