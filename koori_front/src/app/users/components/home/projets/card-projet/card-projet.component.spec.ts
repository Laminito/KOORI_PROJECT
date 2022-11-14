import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProjetComponent } from './card-projet.component';

describe('CardProjetComponent', () => {
  let component: CardProjetComponent;
  let fixture: ComponentFixture<CardProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
