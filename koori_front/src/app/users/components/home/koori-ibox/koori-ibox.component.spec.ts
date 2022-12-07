import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KooriIboxComponent } from './koori-ibox.component';

describe('KooriIboxComponent', () => {
  let component: KooriIboxComponent;
  let fixture: ComponentFixture<KooriIboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KooriIboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KooriIboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
