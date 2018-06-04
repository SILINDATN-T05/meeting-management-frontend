import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMbrDialogComponent } from './add-mbr-dialog.component';

describe('AddMbrDialogComponent', () => {
  let component: AddMbrDialogComponent;
  let fixture: ComponentFixture<AddMbrDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMbrDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMbrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
