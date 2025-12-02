import {Component, Input} from '@angular/core';
import {Sets} from '../../../models/sets';
import {Card} from 'primeng/card';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-set-display-mini',
  imports: [
    Card,
    Tag
  ],
  templateUrl: './set-display-mini.component.html',
  styleUrl: './set-display-mini.component.css',
})
export class SetDisplayMiniComponent {

  // @ts-ignore
  @Input() set: Sets;

}
