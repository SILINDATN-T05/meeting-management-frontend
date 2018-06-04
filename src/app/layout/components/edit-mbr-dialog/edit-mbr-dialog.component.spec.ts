import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMbrDialogComponent } from './edit-mbr-dialog.component';

describe('EditMbrDialogComponent', () => {
  let component: EditMbrDialogComponent;
  let fixture: ComponentFixture<EditMbrDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMbrDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMbrDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
