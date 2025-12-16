import {Component, OnInit} from '@angular/core';
import {DataView} from 'primeng/dataview';
import {Button} from 'primeng/button';
import {CWService} from '../../services/collecion-wishlist/cwservice';
import {CollectWish} from '../../models/collectWish';
import {MenuItem} from 'primeng/api';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [
    DataView,
    Button
  ],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.css',
})
export class CollectionsPage implements OnInit {

  cwList: CollectWish[] = []

  constructor(private router: Router,
              private service: CWService) {
  }

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections (){
    this.service.getAllCollections().subscribe({
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
      {label: 'Collections', routerLink: '../../collections'}
    ];

    const state: NavigationExtras = {
      state: {
        data: {breadcrumb: items, cw: cw}
      }
    };

    this.router.navigate(['../cw', cw.id], state);
  }

}
