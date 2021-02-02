import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAdsSearchComponent } from './results-ads-search.component';

describe('ResultsAdsSearchComponent', () => {
  let component: ResultsAdsSearchComponent;
  let fixture: ComponentFixture<ResultsAdsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsAdsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsAdsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
