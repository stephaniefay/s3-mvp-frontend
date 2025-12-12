import {Component, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Set} from '@tcgdex/sdk'

@Component({
  selector: 'app-set-display-full',
  imports: [
    Card,
    Divider,
    Button,
    RouterLink
  ],
  templateUrl: './set-display-full.component.html',
  styleUrl: './set-display-full.component.css',
})
export class SetDisplayFullComponent {

  @Input() set: Set | null = null;

  getSecretRares () {
    if (this.set) {
      return this.set.cardCount.total - this.set.cardCount.official;
    }
    return null;
  }

  getLogo() {
    if (this.set) {
      if (this.set.logo) {
        return this.set.logo + '.png';
      }
    }

    return '/assets/logo.png';
  }

  getLink() {
    if (this.set != null) {
      return 'sets/' + this.set.id;
    }
    return 'sets';
  }
}
