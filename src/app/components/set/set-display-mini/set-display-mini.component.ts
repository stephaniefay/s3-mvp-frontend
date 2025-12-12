import {Component, Input} from '@angular/core';
import {Card} from 'primeng/card';
import {SetResume} from '@tcgdex/sdk';

@Component({
  selector: 'app-set-display-mini',
  imports: [
    Card
  ],
  templateUrl: './set-display-mini.component.html',
  styleUrl: './set-display-mini.component.css',
})
export class SetDisplayMiniComponent {

  // @ts-ignore
  @Input() set: SetResume;

  getSymbol() {
    if (this.set) {
      if (this.set.symbol) {
        return this.set.symbol + '.png';
      }
    }

    return '/assets/symbol.png';
  }

}
