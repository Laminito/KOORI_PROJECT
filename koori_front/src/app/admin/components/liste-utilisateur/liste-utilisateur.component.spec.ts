import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUtilisateurComponent } from './liste-utilisateur.component';

describe('ListeUtilisateurComponent', () => {
  let component: ListeUtilisateurComponent;
  let fixture: ComponentFixture<ListeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
