import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsInviteesComponent } from './sessions-invitees.component';

describe('SessionsInviteesComponent', () => {
  let component: SessionsInviteesComponent;
  let fixture: ComponentFixture<SessionsInviteesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionsInviteesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsInviteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
