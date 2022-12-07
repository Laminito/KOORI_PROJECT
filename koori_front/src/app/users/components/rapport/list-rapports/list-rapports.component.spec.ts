import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRapportsComponent } from './list-rapports.component';

describe('ListRapportsComponent', () => {
  let component: ListRapportsComponent;
  let fixture: ComponentFixture<ListRapportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRapportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
