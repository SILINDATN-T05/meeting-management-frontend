import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisedViewComponent } from './authorised-view.component';

describe('AuthorisedViewComponent', () => {
  let component: AuthorisedViewComponent;
  let fixture: ComponentFixture<AuthorisedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorisedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
