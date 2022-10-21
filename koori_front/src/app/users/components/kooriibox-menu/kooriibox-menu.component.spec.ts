import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KooriiboxMenuComponent } from './kooriibox-menu.component';

describe('KooriiboxMenuComponent', () => {
  let component: KooriiboxMenuComponent;
  let fixture: ComponentFixture<KooriiboxMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KooriiboxMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KooriiboxMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
