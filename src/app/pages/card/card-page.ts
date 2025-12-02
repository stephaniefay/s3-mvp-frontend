import {Component, OnInit} from '@angular/core';
import {Navigation, Router} from '@angular/router';
import {Cards} from '../../models/card';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';
import {Ability} from '../../models/ability';
import {Divider} from 'primeng/divider';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {User} from '../../models/user';
import {Button} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-card-page',
  imports: [
    Breadcrumb,
    Divider,
    Button,
    Tooltip
  ],
  templateUrl: './card-page.html',
  styleUrl: './card-page.css',
})
export class CardPage implements OnInit {
  card: Cards | undefined = undefined;
  user: User | null = null;

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  constructor(private router: Router,
              private auth: AuthenticationService) {
    const navigation: Navigation | null = this.router.currentNavigation();
    if (navigation) {
      const state = navigation.extras.state;
      if (state) {
        const data = state['data'];

        this.card = data['card'];
        this.items = [... data['breadcrumb']];

        this.items.push({ label:  this.card?.name, routerLink: '../../cards/' + this.card?.id, state: state })
        console.log(this.card)
      }
    }

    this.home = { icon: 'pi pi-home', routerLink: '/' };
    this.loadUser();
  }

  ngOnInit() {}

  getImageAbility(ability: Ability): string {
    let newValue = ability.type.replaceAll('é', 'e');
    newValue = newValue.replaceAll('-', '');

    return newValue.toLowerCase();
  }

  loadUser (): User | null {
    if (this.user == null) {
      this.user = this.auth.getUser();
    }

    return this.user;
  }
}
