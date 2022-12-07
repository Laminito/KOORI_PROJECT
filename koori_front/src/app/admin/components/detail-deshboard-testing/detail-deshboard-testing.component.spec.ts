import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDeshboardTestingComponent } from './detail-deshboard-testing.component';

describe('DetailDeshboardTestingComponent', () => {
  let component: DetailDeshboardTestingComponent;
  let fixture: ComponentFixture<DetailDeshboardTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDeshboardTestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDeshboardTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
