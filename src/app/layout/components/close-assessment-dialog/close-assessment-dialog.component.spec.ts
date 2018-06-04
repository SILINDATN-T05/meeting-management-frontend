import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAssessmentDialogComponent } from './close-assessment-dialog.component';

describe('CloseAssessmentDialogComponent', () => {
  let component: CloseAssessmentDialogComponent;
  let fixture: ComponentFixture<CloseAssessmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseAssessmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAssessmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
