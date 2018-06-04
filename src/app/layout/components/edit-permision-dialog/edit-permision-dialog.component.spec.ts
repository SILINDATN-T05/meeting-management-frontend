import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermisionDialogComponent } from './edit-permision-dialog.component';

describe('EditPermisionDialogComponent', () => {
  let component: EditPermisionDialogComponent;
  let fixture: ComponentFixture<EditPermisionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPermisionDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermisionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
