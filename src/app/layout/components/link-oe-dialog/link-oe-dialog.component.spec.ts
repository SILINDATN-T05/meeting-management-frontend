import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkOeDialogComponent } from './link-oe-dialog.component';

describe('LinkOeDialogComponent', () => {
  let component: LinkOeDialogComponent;
  let fixture: ComponentFixture<LinkOeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkOeDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkOeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
