import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedAssessmentComponent } from './authorised-assessment.component';

describe('AuthorisedAssessmentComponent', () => {
  let component: AuthorisedAssessmentComponent;
  let fixture: ComponentFixture<AuthorisedAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
