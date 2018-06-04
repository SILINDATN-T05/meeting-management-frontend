import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoriseLogsComponent } from './authorise-logs.component';

describe('AuthoriseLogsComponent', () => {
  let component: AuthoriseLogsComponent;
  let fixture: ComponentFixture<AuthoriseLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoriseLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoriseLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
