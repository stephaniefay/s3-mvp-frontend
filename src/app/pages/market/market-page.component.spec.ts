import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPage } from './market-page.component';

describe('Market', () => {
  let component: MarketPage;
  let fixture: ComponentFixture<MarketPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
