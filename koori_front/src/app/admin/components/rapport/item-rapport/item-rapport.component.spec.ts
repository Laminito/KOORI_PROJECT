import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRapportComponent } from './item-rapport.component';

describe('ItemRapportComponent', () => {
  let component: ItemRapportComponent;
  let fixture: ComponentFixture<ItemRapportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRapportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
