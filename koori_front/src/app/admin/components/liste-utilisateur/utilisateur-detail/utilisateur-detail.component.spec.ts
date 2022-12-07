import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurDetailComponent } from './utilisateur-detail.component';

describe('UtilisateurDetailComponent', () => {
  let component: UtilisateurDetailComponent;
  let fixture: ComponentFixture<UtilisateurDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisateurDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
