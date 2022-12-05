import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDemandesComponent } from './mes-demandes.component';

describe('MesDemandesComponent', () => {
  let component: MesDemandesComponent;
  let fixture: ComponentFixture<MesDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesDemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
