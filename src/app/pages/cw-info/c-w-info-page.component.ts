import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Navigation, NavigationExtras, Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {CollectWish, Type} from '../../models/collectWish';
import {UserService} from '../../services/user/user-service';
import {User} from '../../models/user';
import {CWService} from '../../services/collecion-wishlist/cwservice';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Inplace} from 'primeng/inplace';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {InputText} from 'primeng/inputtext';
import {Panel} from 'primeng/panel';
import {Popover} from 'primeng/popover';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AutoFocus} from 'primeng/autofocus';
import {Condition, CWCard} from '../../models/card';
import {ToggleButton} from 'primeng/togglebutton';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-collections-info-page',
  imports: [
    Breadcrumb,
    Button,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    Inplace,
    InputGroup,
    InputGroupAddon,
    InputText,
    Panel,
    Popover,
    ReactiveFormsModule,
    Textarea,
    FormsModule,
    AutoFocus,
    ToggleButton,
    Tooltip
  ],
  templateUrl: './c-w-info-page.component.html',
  styleUrl: './c-w-info-page.component.css',
})
export class CWInfoPage implements OnInit {

  cwId: string | null = null;
  cw: CollectWish | undefined;

  user: User | undefined;
  loggedUser: User | null = null;

  authentication = inject(AuthenticationService);
  userLogged = effect(() => {
    const user = this.authentication.user();
    if (user) {
      this.loggedUser = user;
    }
  });

  changedName: string | null = null;
  changedDescription: string | null = null;
  changedCover: string | null = null;
  changedPrivacy: boolean | undefined;
  editingDescription: boolean = false;

  items: MenuItem[] | undefined = [];
  home: MenuItem | undefined;

  cards: CWCard[] = [];

  @ViewChild('inplaceName') inplaceName!: Inplace;
  @ViewChild('popOverCover') popOverCover!: Popover;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private cwService: CWService,
              private messageService: MessageService) {
    this.cwId = this.route.snapshot.paramMap.get('id');

    const navigation: Navigation | null = this.router.currentNavigation();

    if (navigation) {
      const state = navigation.extras.state;

      if (state) {
        const data = state['data'];

        this.items = [...data['breadcrumb']];
        this.cw = data['cw'];

        if (this.cw)
          this.items.push({label: this.cw.name, routerLink: '../../cw/' + this.cw.id, state: state});
      }
    }

    this.loadCards();

    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  ngOnInit() {
    if (this.cw) {
      this.loadUser(this.cw.userId);
      this.changedPrivacy = this.cw.privacy == 'private';
    } else if (this.cwId) {
      this.loadCW();
    } else {
      this.router.navigate(['/'], {relativeTo: null});
    }
  }

  private loadCW() {
    if (this.cwId)
      this.cwService.getGenericCW(this.cwId).subscribe({
        next: (cw) => {
          // @ts-ignore
          this.items.push({label: cw.name})

          this.cw = cw;
          this.changedPrivacy = this.cw.privacy == 'private';
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Collection or Wishlist not found'});
          this.router.navigate(['/']);
        }
      });
  }

  loadUser(id: string) {
    this.userService.getUser(id).subscribe({
      next: user => {
        this.user = user;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  isSameUser() {
    return this.loggedUser && this.user && this.loggedUser.id === this.user.id;
  }

  editName() {
    if (this.cw)
      this.changedName = this.cw.name
  }

  saveName() {
    if (this.cwId)
      this.updateCW(this.changedName, null, null, null);

    this.inplaceName.deactivate();
  }

  editDescription() {
    this.editingDescription = true;

    if (this.cw)
      this.changedDescription = this.cw.description ? this.cw.description : null;
  }

  saveDescription() {
    if (this.cwId)
      this.updateCW(null, this.changedDescription, null, null);

    this.editingDescription = false;
  }

  editCover(event: any) {
    if (this.cw)
      this.changedCover = this.cw.cover ? this.cw.cover : null;

    this.popOverCover.toggle(event);
  }

  saveCover(event: any) {
    if (this.cwId)
      this.updateCW(null, null, this.changedCover, null);

    this.popOverCover.toggle(event);
  }

  togglePrivacy() {
    if (this.changedPrivacy != undefined)
      this.updateCW(null, null, null, this.changedPrivacy)
  }

  updateCW(name: string | null, description: string | null, cover: string | null, isPrivate: boolean | null) {
    if (this.cwId && this.cw) {
      if (this.cw.type == Type.COLLECTION) {
        this.cwService.updateCollection(this.cwId, name, description, cover, isPrivate).subscribe({
          next: collection => {
            if (collection) {
              this.cw = collection;
              this.messageService.add({severity: 'success', summary: this.cw.type + ' updated'});
            }
          },
          error: err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Could not update ' + this.cw?.type + ', try again later'
            });
          }
        });
      } else if (this.cw.type == Type.WISHLIST) {
        this.cwService.updateWishlist(this.cwId, name, description, cover).subscribe({
          next: wishlist => {
            if (wishlist) {
              this.cw = wishlist;
              this.messageService.add({severity: 'success', summary: this.cw.type + ' updated'});
            }
          },
          error: err => {
            this.messageService.add({
              severity: 'error',
              summary: 'Could not update ' + this.cw?.type + ', try again later'
            });
          }
        });
      }
    }
  }

  getCover(cw: CollectWish): string {
    if (cw.cover) {
      return cw.cover;
    } else {
      return '/assets/no-cover-cw.png'
    }
  }

  goToUser() {
    if (this.user) {
      this.router.navigate(['/../../profile/' + this.user.id]);
    }
  }

  loadCards() {
    if (this.cwId)
      this.cwService.loadAllCards(this.cwId).subscribe({
        next: cards => {
          this.cards = [...cards.cards];

          if (this.cw && this.cw.type == Type.WISHLIST) {
            this.cards.sort((a, b) => {
              const valA = a.priority ?? Infinity;
              const valB = b.priority ?? Infinity;

              return valA - valB;
            });
          }
        }
      })
  }

  removeFromCW(card: CWCard) {
    if (this.cwId && card.id && this.isSameUser()) {
      this.cwService.removeCardFromCW(this.cwId, card.id).subscribe({
        next: suc => {
          this.loadCards();
          this.messageService.add({severity: 'success', summary: 'Card removed successfully!'});
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Could not remove card from ' + this.cw?.type + ', try again later'});
        }
      })
    }
  }

  navigateTo(card: CWCard) {
    if (card) {
      const aux = {breadcrumb: this.items}
      const state: NavigationExtras = {
        state: {
          data: aux
        }
      };

      this.router.navigate(['/cards', card.externalId], state);
    }
  }

  getCondition(condition: number) {
    switch (condition) {
      case Condition.MINT:
        return 'Mint';
      case Condition.NEAR_MINT:
        return 'Near Mint';
      case Condition.SLIGHTLY_PLAYED:
        return 'Slightly Played';
      case Condition.MODERATELY_PLAYED:
        return 'Moderately Played';
      case Condition.HEAVILY_PLAYED:
        return 'Heavily Played';
      case Condition.DAMAGED:
        return 'Damaged';
      default:
        return 'No condition';
    }
  }

  convertToFlag(language: string) {
    if (language.length !== 2) {
      return '';
    }

    if(language == 'pt')
      language = 'br'

    const base = 127397;
    const codePoints = language
      .toUpperCase()
      .split('')
      .map(char => base + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  }

  protected readonly Type = Type;
}
