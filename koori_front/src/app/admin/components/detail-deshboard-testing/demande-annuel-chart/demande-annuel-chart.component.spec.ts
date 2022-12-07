import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAnnuelChartComponent } from './demande-annuel-chart.component';

describe('DemandeAnnuelChartComponent', () => {
  let component: DemandeAnnuelChartComponent;
  let fixture: ComponentFixture<DemandeAnnuelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAnnuelChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAnnuelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
