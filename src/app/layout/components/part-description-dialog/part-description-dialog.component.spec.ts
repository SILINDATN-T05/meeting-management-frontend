import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDescriptionDialogComponent } from './part-description-dialog.component';

describe('PartDescriptionDialogComponent', () => {
  let component: PartDescriptionDialogComponent;
  let fixture: ComponentFixture<PartDescriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartDescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
