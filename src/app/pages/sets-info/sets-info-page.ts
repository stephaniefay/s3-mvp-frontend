import {Component} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FilterService, MenuItem} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {FormsModule} from '@angular/forms';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import TCGdex, {CardResume} from '@tcgdex/sdk';
import {LanguageSelectorService} from '../../services/language-selector/language-selector-service';

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

  cards: CardResume[] | undefined = [];
  filteredCards: CardResume[] | undefined = [];
  searchedTerm: string | undefined;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  tcgdex: TCGdex | null = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private language: LanguageSelectorService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.tcgdex = new TCGdex(this.language.getLanguage());

    this.setId = this.route.snapshot.paramMap.get('id');
    this.setName = this.route.snapshot.queryParamMap.get('name');

    if (this.setId != null && this.setName != null) {
      this.tcgdex.fetchCards(this.setId).then(cards => {
        if (cards) {
          this.cards = cards;
          this.filteredCards = [... this.cards];
        }
      });

      this.items = [
        { label:  this.setName, routerLink: '../../sets/' + this.setId, queryParams: { name: this.setName } },
      ];

      this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
  }

  navigateToCard (card: CardResume) {
    // @ts-ignore
    this.tcgdex.card.get(card.id).then(card => {
      if (card) {
        const aux = {breadcrumb: this.items}
        const state: NavigationExtras = {
          state: {
            data: aux
          }
        };

        this.router.navigate(['/cards', card.id], state);
      }
    })
  }

  filterCards() {
    if (this.cards) {
      this.filteredCards = [... this.filterService.filter(this.cards, ['name', 'id'], this.searchedTerm, 'contains')];
    }
  }
}
