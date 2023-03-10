import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKooriiboxComponent } from './detail-kooriibox.component';

describe('DetailKooriiboxComponent', () => {
  let component: DetailKooriiboxComponent;
  let fixture: ComponentFixture<DetailKooriiboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailKooriiboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailKooriiboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
