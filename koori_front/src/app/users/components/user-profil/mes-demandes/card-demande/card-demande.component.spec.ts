import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDemandeComponent } from './card-demande.component';

describe('CardDemandeComponent', () => {
  let component: CardDemandeComponent;
  let fixture: ComponentFixture<CardDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
