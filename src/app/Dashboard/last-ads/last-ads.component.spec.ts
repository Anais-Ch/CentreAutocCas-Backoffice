import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAdsComponent } from './last-ads.component';

describe('LastAdsComponent', () => {
  let component: LastAdsComponent;
  let fixture: ComponentFixture<LastAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
