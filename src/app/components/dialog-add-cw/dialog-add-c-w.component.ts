import {Component, OnInit} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {Collection} from '../../models/collection';
import {Wishlist} from '../../models/wishlist';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Tags} from '../../models/tags';
import {MultiSelect} from 'primeng/multiselect';
import {Divider} from 'primeng/divider';
import {Button} from 'primeng/button';

export enum DefaultTags {
  AVAILABLE_TRADE = 'Available Trade',
  AVAILABLE_SELL = 'Available Sell',
}

@Component({
  selector: 'app-add-c-w',
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
  templateUrl: './dialog-add-c-w.component.html',
  styleUrl: './dialog-add-c-w.component.css',
})

export class DialogAddCW implements OnInit {

  placeholder: 'Collection' | 'Wishlist' = 'Collection';

  collections: Collection[] = [];
  wishlists: Wishlist[] = [];

  selectedCollWish: string | undefined;
  selectedCondition: string | undefined;
  selectedLanguage: string | undefined;
  selectedQuantity: number | undefined;

  selectedTags: Tags[] = [];

  tags: Tags[] = [];

  constructor(private config: DynamicDialogConfig,
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
    return []
  }

  getLanguages() {
    return []
  }

  getTags () {
    this.tags = []
  }

  save() {
    console.log('save')
  }

  dismiss() {
    this.ref.close();
  }
}
