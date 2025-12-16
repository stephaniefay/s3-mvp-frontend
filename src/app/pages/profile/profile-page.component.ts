import {Component, effect, inject, OnInit, ViewChild} from '@angular/core';
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {CollectWish} from '../../models/collectWish';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user-service';
import {Inplace} from 'primeng/inplace';
import {AutoFocus} from 'primeng/autofocus';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {MenuItem, MessageService} from 'primeng/api';
import {Popover} from 'primeng/popover';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {DialogService} from 'primeng/dynamicdialog';
import {DialogCreateCw} from '../../components/dialog-create-cw/dialog-create-cw';
import {first} from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    Panel,
    Inplace,
    AutoFocus,
    InputText,
    ButtonDirective,
    ButtonIcon,
    FormsModule,
    Textarea,
    ButtonLabel,
    Popover,
    InputGroup,
    InputGroupAddon
  ],
  providers: [DialogService],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePage implements OnInit {

  profileId: string | null = null;

  collections: CollectWish[] = [];
  wishlists: CollectWish[] = [];

  loggedUser: User | null = null;
  user: User | null = null;

  editingBio: boolean = false;

  changedName: string | null = null;
  changedBio: string | null = null;
  changedAvatar: string | null = null;

  authentication = inject(AuthenticationService);
  userLogged = effect(() => {
    const user = this.authentication.user();
    if (user) {
      this.loggedUser = user;
    }
  });

  @ViewChild('inplaceName') inplaceName!: Inplace;
  @ViewChild('popOverAvatar') popOverAvatar!: Popover;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private message: MessageService,
              private service: UserService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');

    if (this.profileId) {
      this.loadUser();
      this.loadCollections();
      this.loadWishlists();
    } else {
      this.router.navigate(['/']);
    }
  }

  loadUser() {
    if (this.profileId) {
      this.service.getUser(this.profileId).subscribe({
        next: (data: User) => {
          this.user = data;
          this.isSameUser();
        },
        error: error => {
          console.error(error);
          this.router.navigate(['/']);
        }
      })
    }
  }

  isSameUser() {
    return this.loggedUser && this.user && this.loggedUser.id === this.user.id;
  }

  createCollection() {
    const ref = this.dialog.open(DialogCreateCw, {
      header: 'Create Collection',
      width: '50%',
      contentStyle: {overflow: 'visible'},
      baseZIndex: 10000,
      closable: true,
      data: {type: 'collection'}
    });

    ref?.onClose.pipe(first()).subscribe((data) => {
      this.loadCollections();
    });
  }

  createWishlist() {
    const ref = this.dialog.open(DialogCreateCw, {
      header: 'Create Wishlist',
      width: '50%',
      contentStyle: {overflow: 'visible'},
      baseZIndex: 10000,
      closable: true,
      data: {type: 'wishlist'}
    });

    ref?.onClose.pipe(first()).subscribe((data) => {
      this.loadWishlists();
    });
  }

  updateUser(name: string | null, bio: string | null, avatar: string | null) {
    if (this.loggedUser)
      this.service.updateUser(this.loggedUser.id, name, bio, avatar).subscribe({
        next: (data: User) => {
          this.user = data;
        },
        error: error => {
          this.message.add({severity: 'warn', summary: 'Something went wrong with your update', detail: 'please try again later'});
          console.error(error);
        }
      });
  }

  editAvatar(event: any) {
    if (this.user)
      this.changedAvatar = this.user.image ? this.user.image : null;

    this.popOverAvatar.toggle(event);
  }

  editBio() {
    this.editingBio = true;

    if (this.user)
      this.changedBio = this.user.bio ? this.user.bio : null;
  }

  editName() {
    if (this.user)
      this.changedName = this.user.name
  }

  saveAvatar(event: any) {
    this.updateUser(null, null, this.changedAvatar);

    this.popOverAvatar.toggle(event);
  }

  saveName() {
    this.updateUser(this.changedName, null, null);
    // close inplace
    this.inplaceName.deactivate();
  }

  saveBio() {
    this.updateUser(null, this.changedBio, null)
    this.editingBio = false;
  }

  loadCollections() {
    if (this.profileId) {
      this.service.getUserCollections(this.profileId).subscribe({
        next: value =>  {
          this.collections = [... value.cw]
        },
        error: error => {
          console.error(error);
          this.collections = [];
        }
      })
    }
  }

  loadWishlists() {
    if (this.profileId) {
      this.service.getUserWishlists(this.profileId).subscribe({
        next: value =>  {
          this.wishlists = [... value.cw]
        },
        error: error => {
          console.error(error);
          this.wishlists = [];
        }
      })
    }
  }

  navigateTo(cw: CollectWish) {
    if (this.user) {
      const items: MenuItem[] = [
        {label: this.user.name, routerLink: '../../profile/' + this.user.id}
      ];

      const state: NavigationExtras = {
        state: {
          data: {breadcrumb: items, cw: cw}
        }
      };

      this.router.navigate(['../cw', cw.id], state);
    }
  }

  getCover (cw: CollectWish): string {
    if (cw.cover) {
      return cw.cover;
    } else {
      return '/assets/no-cover-cw.png'
    }
  }
}
