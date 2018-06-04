import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermisionDialogComponent } from './add-permision-dialog.component';

describe('AddPermisionDialogComponent', () => {
  let component: AddPermisionDialogComponent;
  let fixture: ComponentFixture<AddPermisionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPermisionDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermisionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
