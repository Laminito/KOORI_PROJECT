import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCatalogueComponent } from './service-catalogue.component';

describe('ServiceCatalogueComponent', () => {
  let component: ServiceCatalogueComponent;
  let fixture: ComponentFixture<ServiceCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
