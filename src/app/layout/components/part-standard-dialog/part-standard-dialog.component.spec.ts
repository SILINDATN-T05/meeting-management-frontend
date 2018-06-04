import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartStandardDialogComponent } from './part-standard-dialog.component';

describe('PartStandardDialogComponent', () => {
  let component: PartStandardDialogComponent;
  let fixture: ComponentFixture<PartStandardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartStandardDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartStandardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
