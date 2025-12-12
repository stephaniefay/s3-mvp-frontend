import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Navigation, Router} from '@angular/router';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {Divider} from 'primeng/divider';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../models/user';
import {Button} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogComponent} from '../../components/dynamic-dialog/dynamic-dialog-component';
import TCGdex, {Card} from '@tcgdex/sdk'
import {LanguageSelectorService} from '../../services/language-selector/language-selector-service';

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
  cardId: string | null = null;

  card: Card | null = null;
  user: User | null = null;

  items: MenuItem[] | undefined = [];
  home: MenuItem | undefined;

  tcgdex: TCGdex | null = null;

  constructor(private router: Router,
              private auth: AuthenticationService,
              private language: LanguageSelectorService,
              private route: ActivatedRoute,
              private dialog: DialogService) {

    this.cardId = this.route.snapshot.paramMap.get('id');

    const navigation: Navigation | null = this.router.currentNavigation();
    if (navigation) {
      const state = navigation.extras.state;
      if (state) {
        const data = state['data'];

        this.items = [...data['breadcrumb']];
      }
    }

    if (this.cardId) {
      this.tcgdex = new TCGdex(this.language.getLanguage());
      this.tcgdex.card.get(this.cardId).then((card) => {
        if (card) {
          this.card = card;
          if (this.items == undefined)
            this.items = [];

          this.items.push({label: this.card.name, routerLink: '../../cards/' + this.cardId})
        } else {
          this.router.navigate(['/']);
        }
      });
    } else
      this.router.navigate(['/']);

    this.home = {icon: 'pi pi-home', routerLink: '/'};
    this.loadUser();
  }

  ngOnInit() {
  }

  getImageAbility(ability: any): string {
    let newValue = ability.type.replaceAll('é', 'e');
    newValue = newValue.replaceAll('-', '');

    return newValue.toLowerCase();
  }

  loadUser(): User | null {
    if (this.user == null) {
//      this.user = this.auth.getUser();
    }

    return this.user;
  }

  addToWishlist() {
    this.dialog.open(DynamicDialogComponent, {
      header: 'Add To Wishlist',
      width: '50%',
      contentStyle: {overflow: 'visible'},
      baseZIndex: 10000,
      closable: true,
      data: {type: 'wishlist', card: this.card}
    });
  }

  addToCollection() {
    this.dialog.open(DynamicDialogComponent, {
      header: 'Add To Collection',
      width: '50%',
      contentStyle: {overflow: 'visible'},
      baseZIndex: 10000,
      closable: true,
      data: {type: 'collection', card: this.card}
    });
  }

  getRetreat (quantity:number | undefined) {
    if (quantity)
      return Array(quantity).fill('colorless');

    return [];
  }
}
