import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPartDialogComponent } from './copy-part-dialog.component';

describe('CopyPartDialogComponent', () => {
  let component: CopyPartDialogComponent;
  let fixture: ComponentFixture<CopyPartDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyPartDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyPartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
