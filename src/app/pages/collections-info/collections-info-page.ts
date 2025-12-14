import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Navigation, Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {Breadcrumb} from 'primeng/breadcrumb';
import {Collection} from '../../models/collection';
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
    AutoFocus
  ],
  templateUrl: './collections-info-page.html',
  styleUrl: './collections-info-page.css',
})
export class CollectionsInfoPage implements OnInit {

  collectionId: string | null = null;
  collection: Collection | undefined;

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

  @ViewChild('inplaceName') inplaceName!: Inplace;
  @ViewChild('popOverCover') popOverCover!: Popover;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private cwService: CWService,
              private messageService: MessageService) {
    this.collectionId = this.route.snapshot.paramMap.get('id');

    const navigation: Navigation | null = this.router.currentNavigation();

    if (navigation) {
      const state = navigation.extras.state;

      if (state) {
        const data = state['data'];

        this.items = [...data['breadcrumb']];
        this.collection = data['collection'];

        if (this.collection)
          this.items.push({label: this.collection.name})
      }
    }

    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  ngOnInit() {
    if (this.collection) {
      this.loadUser(this.collection.userId);
    } else if (this.collectionId) {
      this.cwService.getCollectionById(this.collectionId).subscribe({
        next: (collection) => {
          // @ts-ignore
          this.items.push({label: collection.name})

          this.collection = collection;
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Collection not found'});
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/collections'], {relativeTo: null});
    }
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

  editCover(event:any) {
    if (this.collection)
      this.changedCover = this.collection.cover ? this.collection.cover : null;

    this.popOverCover.toggle(event);
  }

  saveCover(event:any) {
    console.log('save cover', event);
    this.popOverCover.toggle(event);
  }

  editName() {
    if (this.collection)
      this.changedName = this.collection.name
  }

  saveName() {
    // close inplace
    this.inplaceName.deactivate();
  }

  editDescription() {
    this.editingDescription = true;

    if (this.collection)
      this.changedDescription = this.collection.description ? this.collection.description : null;
  }

  saveDescription() {
    this.editingDescription = false;
  }

  getImage(card: CWCard): string {
    if (card.image) {
      return card.image + '/low.png'
    } else {
      return '/assets/back_card.png';
    }
  }
}
