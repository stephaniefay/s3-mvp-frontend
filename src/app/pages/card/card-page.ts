import {Component, OnInit} from '@angular/core';
import {Navigation, Router} from '@angular/router';
import {Cards} from '../../models/card';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {Ability} from '../../models/ability';
import {Divider} from 'primeng/divider';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../models/user';
import {Button} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogComponent} from '../../components/dynamic-dialog/dynamic-dialog-component';

@Component({
  selector: 'app-card-page',
  imports: [
    Breadcrumb,
    Divider,
    Button,
    Tooltip
  ],
  providers: [DialogService],
  templateUrl: './card-page.html',
  styleUrl: './card-page.css',
})
export class CardPage implements OnInit {
  card: Cards | undefined = undefined;
  user: User | null = null;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router,
              private auth: AuthenticationService,
              private dialog: DialogService) {
    const navigation: Navigation | null = this.router.currentNavigation();
    if (navigation) {
      const state = navigation.extras.state;
      if (state) {
        const data = state['data'];

        this.card = data['card'];
        this.items = [... data['breadcrumb']];

        this.items.push({ label:  this.card?.name, routerLink: '../../cards/' + this.card?.id, state: state })
      }
    }

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loadUser();
  }

  ngOnInit() {}

  getImageAbility(ability: Ability): string {
    let newValue = ability.type.replaceAll('é', 'e');
    newValue = newValue.replaceAll('-', '');

    return newValue.toLowerCase();
  }

  loadUser (): User | null {
    if (this.user == null) {
      this.user = this.auth.getUser();
    }

    return this.user;
  }

  addToWishlist() {
    this.dialog.open(DynamicDialogComponent, {
      header: 'Add To Wishlist',
      width: '50%',
      contentStyle: { overflow: 'visible' },
      baseZIndex: 10000,
      closable: true,
      data: {type: 'wishlist', card: this.card}
    });
  }

  addToCollection() {
    this.dialog.open(DynamicDialogComponent, {
      header: 'Add To Collection',
      width: '50%',
      contentStyle: { overflow: 'visible' },
      baseZIndex: 10000,
      closable: true,
      data: {type: 'collection', card: this.card}
    });
  }
}
