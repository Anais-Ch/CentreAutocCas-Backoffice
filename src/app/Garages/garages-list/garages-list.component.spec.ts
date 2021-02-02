import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragesListComponent } from './garages-list.component';

describe('GaragesListComponent', () => {
  let component: GaragesListComponent;
  let fixture: ComponentFixture<GaragesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaragesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaragesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
