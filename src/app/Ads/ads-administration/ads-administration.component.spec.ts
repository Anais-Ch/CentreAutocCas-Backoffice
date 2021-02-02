import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsAdministrationComponent } from './ads-administration.component';

describe('AdsAdministrationComponent', () => {
  let component: AdsAdministrationComponent;
  let fixture: ComponentFixture<AdsAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
