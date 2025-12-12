import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Panel} from 'primeng/panel';
import {ActivatedRoute} from '@angular/router';
import {Collection} from '../../models/collection';

@Component({
  selector: 'app-profile',
  imports: [
    Button,
    Panel
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePage implements OnInit {

  profileId: string | null = null;

  collections: Collection[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');

    this.loadCollections();
    this.loadWishlists();
  }

  isSameUser() {
    return true;
  }

  editDescription() {
    console.log('Edit Description');
  }

  loadCollections() {
    if (this.profileId) {
     this.collections = []
    }
  }

  loadWishlists() {

  }
}
