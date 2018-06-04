import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLogsComponent } from './approve-logs.component';

describe('ApproveLogsComponent', () => {
  let component: ApproveLogsComponent;
  let fixture: ComponentFixture<ApproveLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
