import {Component, OnInit} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {CardsService} from '../../services/cards/cards-service';
import {Collection} from '../../models/collection';
import {Wishlist} from '../../models/wishlist';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Condition, Languages} from '../../models/card';
import {Tags} from '../../models/tags';
import {MultiSelect} from 'primeng/multiselect';
import {PrimeTemplate} from 'primeng/api';
import {Divider} from 'primeng/divider';
import {Button} from 'primeng/button';

export enum DefaultTags {
  AVAILABLE_TRADE = 'Available Trade',
  AVAILABLE_SELL = 'Available Sell',
}

@Component({
  selector: 'app-dynamic-dialog-component',
  imports: [
    InputGroup,
    InputGroupAddon,
    InputText,
    Select,
    FormsModule,
    MultiSelect,
    Divider,
    Button
  ],
  templateUrl: './dynamic-dialog-component.html',
  styleUrl: './dynamic-dialog-component.css',
})

export class DynamicDialogComponent implements OnInit {

  placeholder: 'Collection' | 'Wishlist' = 'Collection';

  collections: Collection[] = [];
  wishlists: Wishlist[] = [];

  selectedCollWish: string | undefined;
  selectedCondition: string | undefined;
  selectedLanguage: string | undefined;
  selectedQuantity: number | undefined;

  selectedTags: Tags[] = [];

  tags: Tags[] = [];

  constructor(private service: CardsService,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) {
  }

  ngOnInit() {
    if (this.config.data) {
      console.log(this.config.data);
      if(this.config.data['type'] == 'wishlist')
        this.placeholder = 'Wishlist';
    }

    this.getTags();
  }

  getOptionsWishColl() {
    if (this.placeholder === 'Collection') {
      return this.collections;
    }
    return this.wishlists;
  }

  getConditions() {
    return Object.values(Condition);
  }

  getLanguages() {
    return Object.values(Languages);
  }

  getTags () {
    this.service.loadTags().subscribe(customTags => {
      this.tags = [... customTags]
    });
  }

  save() {
    console.log('save')
  }

  dismiss() {
    this.ref.close();
  }
}
