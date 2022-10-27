import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRapportComponent } from './detail-rapport.component';

describe('DetailRapportComponent', () => {
  let component: DetailRapportComponent;
  let fixture: ComponentFixture<DetailRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
