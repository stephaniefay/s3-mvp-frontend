import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistsInfoPage } from './wishlists-info-page';

describe('WishlistsInfoPage', () => {
  let component: WishlistsInfoPage;
  let fixture: ComponentFixture<WishlistsInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistsInfoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
