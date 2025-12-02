import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wishlists',
  imports: [],
  templateUrl: './wishlists-page.component.html',
  styleUrl: './wishlists-page.component.css',
})
export class WishlistsPage implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

}
