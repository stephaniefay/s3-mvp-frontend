import {Component, OnInit} from '@angular/core';
import {Sets} from '../../models/sets';
import {CardsService} from '../../services/cards/cards-service';
import {SetDisplayMiniComponent} from '../../components/set/set-display-mini/set-display-mini.component';
import {SetDisplayFullComponent} from '../../components/set/set-display-full/set-display-full.component';
import {InputText} from 'primeng/inputtext';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {FormsModule} from '@angular/forms';
import {FilterService} from 'primeng/api';

@Component({
  selector: 'app-sets',
  imports: [
    SetDisplayMiniComponent,
    SetDisplayFullComponent,
    InputText,
    IconField,
    InputIcon,
    FormsModule
  ],
  templateUrl: './sets-page.component.html',
  styleUrl: './sets-page.component.css',
})
export class SetsPage implements OnInit {

  sets: Sets[] = []
  filteredSets: Sets[] = []
  selectedSet: Sets | undefined;
  searchedTerm: string | undefined;

  constructor(private service: CardsService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.service.getSets().subscribe(sets => {
      this.sets = sets
      this.filteredSets = [... this.sets];
    });
  }

  cardClick(set: Sets) {
    this.selectedSet = set;
  }

  filterSets() {
    this.filteredSets = [... this.filterService.filter(this.sets, ['name', 'id'], this.searchedTerm, 'contains')];
    if (this.selectedSet != null && this.filteredSets.indexOf(this.selectedSet) < 0) {
      this.selectedSet = undefined;
    }
  }
}
