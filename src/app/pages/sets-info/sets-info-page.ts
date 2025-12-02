import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sets-info-page',
  imports: [],
  templateUrl: './sets-info-page.html',
  styleUrl: './sets-info-page.css',
})
export class SetsInfoPage {
  setId: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.setId = this.route.snapshot.paramMap.get('id');
  }
}
