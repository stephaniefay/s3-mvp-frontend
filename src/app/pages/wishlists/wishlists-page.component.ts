import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {CollectWish} from '../../models/collectWish';
import {CWService} from '../../services/collecion-wishlist/cwservice';
import {MenuItem} from 'primeng/api';
import {Button} from 'primeng/button';
import {DataView} from 'primeng/dataview';

@Component({
  selector: 'app-wishlists',
  imports: [
    Button,
    DataView
  ],
  templateUrl: './wishlists-page.component.html',
  styleUrl: './wishlists-page.component.css',
})
export class WishlistsPage implements OnInit {
  cwList: CollectWish[] = []

  constructor(private router: Router,
              private service: CWService) {
  }

  ngOnInit() {
    this.loadWishlists();
  }

  loadWishlists (){
    this.service.getAllWishlists().subscribe({
      next: data => {
        this.cwList = data.cw;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  getCover (cw: CollectWish): string {
    if (cw.cover) {
      return cw.cover;
    } else {
      return '/assets/no-cover-cw.png'
    }
  }

  navigateTo(cw: CollectWish) {
    const items: MenuItem[] = [
      {label: 'Wishlists', routerLink: '../../wishlists'}
    ];

    const state: NavigationExtras = {
      state: {
        data: {breadcrumb: items, cw: cw}
      }
    };

    this.router.navigate(['../cw', cw.id], state);
  }

}
