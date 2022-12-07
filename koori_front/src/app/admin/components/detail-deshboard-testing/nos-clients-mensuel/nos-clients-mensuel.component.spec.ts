import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosClientsMensuelComponent } from './nos-clients-mensuel.component';

describe('NosClientsMensuelComponent', () => {
  let component: NosClientsMensuelComponent;
  let fixture: ComponentFixture<NosClientsMensuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosClientsMensuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosClientsMensuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
