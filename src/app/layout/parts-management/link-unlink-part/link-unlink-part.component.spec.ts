import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkUnlinkPartComponent } from './link-unlink-part.component';

describe('LinkUnlinkPartComponent', () => {
  let component: LinkUnlinkPartComponent;
  let fixture: ComponentFixture<LinkUnlinkPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkUnlinkPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkUnlinkPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
