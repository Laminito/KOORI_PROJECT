import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenairesComponent } from './partenaires.component';

describe('PartenairesComponent', () => {
  let component: PartenairesComponent;
  let fixture: ComponentFixture<PartenairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartenairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
