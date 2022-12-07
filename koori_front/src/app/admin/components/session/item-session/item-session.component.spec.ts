import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSessionComponent } from './item-session.component';

describe('ItemSessionComponent', () => {
  let component: ItemSessionComponent;
  let fixture: ComponentFixture<ItemSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
