import {Component} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Cards} from '../../models/card';
import {CardsService} from '../../services/cards/cards-service';
import {FilterService, MenuItem} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {FormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-sets-info-page',
  imports: [
    Breadcrumb,
    FormsModule,
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './sets-info-page.html',
  styleUrl: './sets-info-page.css',
})
export class SetsInfoPage {
  setId: string | null = null;
  setName: string | null = null;

  cards: Cards[] = [];
  filteredCards: Cards[] = [];
  searchedTerm: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CardsService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.setId = this.route.snapshot.paramMap.get('id');
    this.setName = this.route.snapshot.queryParamMap.get('name');

    if (this.setId != null && this.setName != null) {
      this.service.loadCardsFromSet(this.setId).subscribe(cards => {
        this.cards = cards;
        this.filteredCards = [... this.cards];
      });

      this.items = [
        { label:  this.setName, routerLink: '../../sets/' + this.setId, queryParams: { name: this.setName } },
      ];

      this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
  }

  navigateToCard (card: Cards) {
    const aux = {breadcrumb: this.items, card: card}
    const state: NavigationExtras = {
      state: {
        data: aux
      }
    };

    this.router.navigate(['/cards', card.id], state);
  }

  filterCards() {
    this.filteredCards = [... this.filterService.filter(this.cards, ['name', 'id'], this.searchedTerm, 'contains')];
  }
}
