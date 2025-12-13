import {Component, effect, inject, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {ActivatedRoute, Router} from '@angular/router';
import {Collection} from '../../models/collection';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user-service/user-service';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    Panel
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePage implements OnInit {

  profileId: string | null = null;

  collections: Collection[] = [];

  loggedUser: User | null = null;
  user: User | null = null;

  authentication = inject(AuthenticationService);

  userLogged = effect(() => {
    const user = this.authentication.user();
    if (user) {
      this.loggedUser = user;
    }
  });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: UserService) {
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

  addCollection() {
    console.log('addCollection');
  }

  addWishlist() {
    console.log('addwishlist');
  }

  editDescription() {
    console.log('Edit Description');
  }

  loadCollections() {
    if (this.profileId) {
     this.collections = []
    }
  }

  loadWishlists() {

  }
}
