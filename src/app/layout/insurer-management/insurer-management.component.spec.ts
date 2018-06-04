import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurerManagementComponent } from './insurer-management.component';

describe('InsurerManagementComponent', () => {
  let component: InsurerManagementComponent;
  let fixture: ComponentFixture<InsurerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
