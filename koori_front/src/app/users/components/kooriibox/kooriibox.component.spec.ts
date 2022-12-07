import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KooriiboxComponent } from './kooriibox.component';

describe('KooriComponent', () => {
  let component: KooriiboxComponent;
  let fixture: ComponentFixture<KooriiboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KooriiboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KooriiboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
