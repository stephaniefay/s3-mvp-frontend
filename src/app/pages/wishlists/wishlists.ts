import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wishlists',
  imports: [],
  templateUrl: './wishlists.html',
  styleUrl: './wishlists.css',
})
export class Wishlists  implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

}
