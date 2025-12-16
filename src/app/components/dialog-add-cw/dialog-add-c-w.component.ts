import {Component, OnInit} from '@angular/core';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {CollectWish} from '../../models/collectWish';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Tags} from '../../models/tag';
import {Divider} from 'primeng/divider';
import {Button} from 'primeng/button';
import {UserService} from '../../services/user/user-service';
import {Card} from '@tcgdex/sdk';
import {Condition, ICondition, ILanguage, IPriority, Language, Priority} from '../../models/card';
import {TagService} from '../../services/tag/tag.service';
import {CWService} from '../../services/collecion-wishlist/cwservice';
import {MultiSelect} from 'primeng/multiselect';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-c-w',
  imports: [
    InputGroup,
    InputGroupAddon,
    InputText,
    Select,
    FormsModule,
    Divider,
    Button,
    MultiSelect
  ],
  templateUrl: './dialog-add-c-w.component.html',
  styleUrl: './dialog-add-c-w.component.css',
})

export class DialogAddCW implements OnInit {

  placeholder: 'Collection' | 'Wishlist' = 'Collection';

  collections: CollectWish[] = [];
  wishlists: CollectWish[] = [];

  selectedCollWish: CollectWish | undefined;
  selectedCondition: ICondition | undefined;
  selectedQuantity: number | undefined;

  selectedLanguage: ILanguage | undefined;
  selectedTags: Tags[] | undefined;
  selectedPriority: IPriority | undefined;

  tags: Tags[] = [];
  priorities: IPriority[] = [];
  conditions: ICondition[] = [];
  languages: ILanguage[] = [];

  card: Card | undefined;
  userId: string | undefined;

  constructor(private config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private userService: UserService,
              private tagService: TagService,
              private cwService: CWService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    if (this.config.data) {
      if (this.config.data['type'] == 'wishlist')
        this.placeholder = 'Wishlist';

      this.card = this.config.data['card'];
      this.userId = this.config.data['userId'];

      this.loadSelectOptions();
      this.loadTags();
      this.loadPriorities();
      this.loadConditions();
      this.loadLanguages();
    } else {
      this.ref.close();
    }
  }

  loadSelectOptions() {
    if (this.userId) {
      if (this.placeholder === 'Collection') {
        this.userService.getUserCollections(this.userId).subscribe({
          next: result => {
            this.collections = [...result.cw];
          }
        });
      } else {
        this.userService.getUserWishlists(this.userId).subscribe({
          next: result => {
            this.wishlists = [...result.cw];
          }
        })
      }
    }
  }

  getOptionsWishColl() {
    if (this.placeholder === 'Collection') {
      return this.collections;
    }
    return this.wishlists;
  }

  loadTags() {
    this.tagService.getTagsForUser().subscribe({
      next: result => {
        this.tags = [...result.tags];
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadPriorities() {
    this.priorities.push({id: Priority.NO_PRIORITY, name: 'No Priority'});
    this.priorities.push({id: Priority.LOW, name: 'Low Priority'});
    this.priorities.push({id: Priority.MEDIUM, name: 'Medium Priority'});
    this.priorities.push({id: Priority.HIGH, name: 'High Priority'});
  }

  loadConditions() {
    this.conditions.push({id: Condition.MINT, name: 'Mint'});
    this.conditions.push({id: Condition.NEAR_MINT, name: 'Near Mint'});
    this.conditions.push({id: Condition.SLIGHTLY_PLAYED, name: 'Slightly Played'});
    this.conditions.push({id: Condition.MODERATELY_PLAYED, name: 'Moderately Played'});
    this.conditions.push({id: Condition.HEAVILY_PLAYED, name: 'Heavily Played'});
    this.conditions.push({id: Condition.DAMAGED, name: 'Damaged'});
  }


  loadLanguages() {
    this.languages.push({id: Language.PORTUGUESE, name: 'Portuguese'});
    this.languages.push({id: Language.ENGLISH, name: 'English'});
    this.languages.push({id: Language.JAPANESE, name: 'Japanese'});
    this.languages.push({id: Language.GERMAN, name: 'German'});
    this.languages.push({id: Language.FRENCH, name: 'French'});
    this.languages.push({id: Language.ITALIAN, name: 'Italian'});
    this.languages.push({id: Language.SPANISH, name: 'Spanish'});
    this.languages.push({id: Language.KOREAN, name: 'Korean'});
    this.languages.push({id: Language.CHINESE, name: 'Chinese (Traditional and Simplified'});
    this.languages.push({id: Language.DUTCH, name: 'Dutch'});
    this.languages.push({id: Language.RUSSIAN, name: 'Russian'});
    this.languages.push({id: Language.THAI, name: 'Thai'});
    this.languages.push({id: Language.INDONESIAN, name: 'Indonesian'});
  }

  save() {
    if (this.card && this.selectedCollWish && this.selectedCondition && this.selectedLanguage && this.selectedQuantity) {
      let tags: String[] | undefined;

      if (this.selectedTags) {
        tags = [];
        this.selectedTags.forEach(tag => {
          // @ts-ignore
          tags.push(tag.id);
        });
      }

      const card = {
        id: this.card.id,
        externalId: this.card.id,
        name: this.card.name,
        image: this.getImage(),
        condition: this.selectedCondition.id,
        language: this.selectedLanguage.id,
        priority: this.selectedPriority?.id,
        tags: tags,
      }

      this.cwService.addCardToCW(this.selectedCollWish.id, this.getType(), card).subscribe({
        next: result => {
          this.messageService.add({severity: 'success', summary: 'Successfully added ' + this.card?.name + ' to ' + this.selectedCollWish?.name});
          this.dismiss();
        }, error: err => {
          console.log(err);
          this.messageService.add({severity: 'error', summary: 'Error occurred, please try again.'});
        }
      });
    }
  }

  getType () {
    return this.placeholder == 'Collection' ? 'collection' : 'wishlist';
  }

  getImage() {
    if (this.card) {
      if (this.card.image) {
        return this.card.image + '/high.png'
      } else {
        return '/assets/back_card.png';
      }
    }

    return '';
  }

  dismiss() {
    this.ref.close();
  }
}
