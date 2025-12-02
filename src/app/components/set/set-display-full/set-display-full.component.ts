import {Component, Input} from '@angular/core';
import {Sets} from '../../../models/sets';
import {Card} from 'primeng/card';
import {Divider} from 'primeng/divider';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

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

  @Input() set: Sets | undefined;

  getSecretRares() {
    if (this.set != null)
      return this.set.total - this.set.printedTotal;
    return '';
  }

  getLink() {
    if (this.set != null) {
      return 'sets/' + this.set.id;
    }
    return 'sets';
  }
}
