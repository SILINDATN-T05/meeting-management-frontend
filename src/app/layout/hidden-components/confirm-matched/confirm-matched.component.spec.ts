import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMatchedComponent } from './confirm-matched.component';

describe('ConfirmMatchedComponent', () => {
  let component: ConfirmMatchedComponent;
  let fixture: ComponentFixture<ConfirmMatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
