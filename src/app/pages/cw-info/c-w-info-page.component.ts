import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Navigation, Router} from '@angular/router';
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
import {CWCard} from '../../models/card';
import {ToggleButton} from 'primeng/togglebutton';

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
    ToggleButton
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
          this.items.push({label: this.cw.name})
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

  editCover(event:any) {
    if (this.cw)
      this.changedCover = this.cw.cover ? this.cw.cover : null;

    this.popOverCover.toggle(event);
  }

  saveCover(event:any) {
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

  getCover (cw: CollectWish): string {
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

  loadCards () {
    if (this.cwId)
      this.cwService.loadAllCards(this.cwId).subscribe({
        next: cards => {
          this.cards = [... cards.cards];
        }
      })
  }

  protected readonly Type = Type;
}
