import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlinkOeDialogComponent } from './unlink-oe-dialog.component';

describe('UnlinkOeDialogComponent', () => {
  let component: UnlinkOeDialogComponent;
  let fixture: ComponentFixture<UnlinkOeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlinkOeDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlinkOeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
