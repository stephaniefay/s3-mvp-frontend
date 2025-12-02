import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistsPage } from './wishlists-page.component';

describe('Wishlists', () => {
  let component: WishlistsPage;
  let fixture: ComponentFixture<WishlistsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
