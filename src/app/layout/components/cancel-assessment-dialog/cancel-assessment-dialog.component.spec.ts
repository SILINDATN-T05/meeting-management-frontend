import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelAssessmentDialogComponent } from './cancel-assessment-dialog.component';

describe('CancelAssessmentDialogComponent', () => {
  let component: CancelAssessmentDialogComponent;
  let fixture: ComponentFixture<CancelAssessmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelAssessmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelAssessmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
