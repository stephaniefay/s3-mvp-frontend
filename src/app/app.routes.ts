import {Routes} from '@angular/router';
import {SetsPage} from './pages/sets/sets-page.component';
import {TradesPage} from './pages/trades/trades-page.component';
import {MarketPage} from './pages/market/market-page.component';
import {CollectionsPage} from './pages/collections/collections-page.component';
import {WishlistsPage} from './pages/wishlists/wishlists-page.component';
import {SetsInfoPage} from './pages/sets-info/sets-info-page';
import {CardPage} from './pages/card/card-page';
import {Login} from './pages/login/login';
import {ProfilePage} from './pages/profile/profile-page.component';
import {CWInfoPage} from './pages/cw-info/c-w-info-page.component';


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
    path: 'cards/:id',
    component: CardPage
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
    path: 'collections',
    component: CollectionsPage
  },
  {
    path: 'cw/:id',
    component: CWInfoPage
  },
  {
    path: 'wishlists',
    component: WishlistsPage
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'profile/:id',
    component: ProfilePage
  }
];
