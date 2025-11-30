import {Routes} from '@angular/router';
import {Sets} from './pages/sets/sets';
import {Trades} from './pages/trades/trades';
import {Market} from './pages/market/market';
import {Collections} from './pages/collections/collections';
import {Wishlists} from './pages/wishlists/wishlists';


export const routes: Routes = [
  {
    path: '',
    component: Sets
  },
  {
    path: 'trades',
    component: Trades
  },
  {
    path: 'market',
    component: Market
  },
  {
    path: 'collections/:id',
    component: Collections
  },
  {
    path: 'wishlists/:id',
    component: Wishlists
  }
];
