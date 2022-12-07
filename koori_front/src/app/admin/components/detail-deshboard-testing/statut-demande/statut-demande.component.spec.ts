import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutDemandeComponent } from './statut-demande.component';

describe('StatutDemandeComponent', () => {
  let component: StatutDemandeComponent;
  let fixture: ComponentFixture<StatutDemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutDemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatutDemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
