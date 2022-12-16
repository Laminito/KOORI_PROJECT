import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForUserConnectedComponent } from './for-user-connected.component';

describe('ForUserConnectedComponent', () => {
  let component: ForUserConnectedComponent;
  let fixture: ComponentFixture<ForUserConnectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForUserConnectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForUserConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
