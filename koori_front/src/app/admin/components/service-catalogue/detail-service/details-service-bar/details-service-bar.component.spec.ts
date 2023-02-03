import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsServiceBarComponent } from './details-service-bar.component';

describe('DetailsServiceBarComponent', () => {
  let component: DetailsServiceBarComponent;
  let fixture: ComponentFixture<DetailsServiceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsServiceBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsServiceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
