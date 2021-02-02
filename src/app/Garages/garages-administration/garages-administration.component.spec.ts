import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragesAdministrationComponent } from './garages-administration.component';

describe('GaragesAdministrationComponent', () => {
  let component: GaragesAdministrationComponent;
  let fixture: ComponentFixture<GaragesAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaragesAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaragesAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
