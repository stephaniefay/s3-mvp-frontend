import {Routes} from '@angular/router';
import {SetsPage} from './pages/sets/sets-page.component';
import {TradesPage} from './pages/trades/trades-page.component';
import {MarketPage} from './pages/market/market-page.component';
import {CollectionsPage} from './pages/collections/collections-page.component';
import {WishlistsPage} from './pages/wishlists/wishlists-page.component';
import {SetsInfoPage} from './pages/sets-info/sets-info-page';


export const routes: Routes = [
  {
    path: '',
    component: SetsPage
  },
  {
    path: 'sets',
    component: SetsPage
  },
  {
    path: 'sets/:id',
    component: SetsInfoPage
  },
  {
    path: 'trades',
    component: TradesPage
  },
  {
    path: 'market',
    component: MarketPage
  },
  {
    path: 'collections/:id',
    component: CollectionsPage
  },
  {
    path: 'wishlists/:id',
    component: WishlistsPage
  }
];
