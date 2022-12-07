import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KooriComponent } from './koori.component';

describe('KooriComponent', () => {
  let component: KooriComponent;
  let fixture: ComponentFixture<KooriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KooriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KooriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
