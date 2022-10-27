import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDashboardComponent } from './detail-dashboard.component';

describe('DetailDashboardComponent', () => {
  let component: DetailDashboardComponent;
  let fixture: ComponentFixture<DetailDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
