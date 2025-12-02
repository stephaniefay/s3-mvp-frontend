import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-collections',
  imports: [],
  templateUrl: './collections-page.component.html',
  styleUrl: './collections-page.component.css',
})
export class CollectionsPage implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

}
