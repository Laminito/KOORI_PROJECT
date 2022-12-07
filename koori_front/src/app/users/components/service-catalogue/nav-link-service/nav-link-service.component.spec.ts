import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLinkServiceComponent } from './nav-link-service.component';

describe('NavLinkServiceComponent', () => {
  let component: NavLinkServiceComponent;
  let fixture: ComponentFixture<NavLinkServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavLinkServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLinkServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
