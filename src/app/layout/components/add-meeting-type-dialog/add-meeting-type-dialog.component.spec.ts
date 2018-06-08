import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingTypeDialogComponent } from './add-meeting-type-dialog.component';

describe('AddMeetingTypeDialogComponent', () => {
  let component: AddMeetingTypeDialogComponent;
  let fixture: ComponentFixture<AddMeetingTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMeetingTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMeetingTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
