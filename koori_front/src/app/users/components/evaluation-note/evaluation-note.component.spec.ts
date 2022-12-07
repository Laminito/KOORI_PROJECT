import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationNoteComponent } from './evaluation-note.component';

describe('EvaluationNoteComponent', () => {
  let component: EvaluationNoteComponent;
  let fixture: ComponentFixture<EvaluationNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
