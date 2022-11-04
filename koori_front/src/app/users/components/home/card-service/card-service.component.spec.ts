import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardServiceComponent } from './card-service.component';

describe('CardServiceComponent', () => {
  let component: CardServiceComponent;
  let fixture: ComponentFixture<CardServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
