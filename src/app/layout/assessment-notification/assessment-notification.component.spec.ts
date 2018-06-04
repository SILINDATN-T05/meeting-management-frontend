import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNotificationComponent } from './assessment-notification.component';

describe('AssessmentNotificationComponent', () => {
  let component: AssessmentNotificationComponent;
  let fixture: ComponentFixture<AssessmentNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
