import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnimateComponent } from './text-animate.component';

describe('TextAnimateComponent', () => {
  let component: TextAnimateComponent;
  let fixture: ComponentFixture<TextAnimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAnimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
