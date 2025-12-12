import {Component, OnInit} from '@angular/core';
import {SetDisplayMiniComponent} from '../../components/set/set-display-mini/set-display-mini.component';
import {SetDisplayFullComponent} from '../../components/set/set-display-full/set-display-full.component';
import {InputText} from 'primeng/inputtext';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {FormsModule} from '@angular/forms';
import {FilterService} from 'primeng/api';
import TCGdex, {Set, SetResume} from '@tcgdex/sdk'
import {LanguageSelectorService} from '../../services/language-selector/language-selector-service';

@Component({
  selector: 'app-sets',
  imports: [
    SetDisplayMiniComponent,
    SetDisplayFullComponent,
    InputText,
    IconField,
    InputIcon,
    FormsModule,
  ],
  templateUrl: './sets-page.component.html',
  styleUrl: './sets-page.component.css',
})
export class SetsPage implements OnInit {

  sets: SetResume[] = []
  filteredSets: SetResume[] = []
  selectedSet: Set | null = null;
  searchedTerm: string | undefined;

  tcgdex: TCGdex | null = null;

  constructor(private language: LanguageSelectorService,
              private filterService: FilterService) {
  }

  ngOnInit() {
    this.tcgdex = new TCGdex(this.language.getLanguage());

    this.tcgdex.set.list().then(sets => {
      this.sets = sets;
      this.filteredSets = [...sets];
    })
  }

  cardClick(clickedSet: SetResume) {
    // @ts-ignore
    this.tcgdex.set.get(clickedSet.id).then(set => {
      this.selectedSet = set;
    })
  }

  filterSets() {
    this.filteredSets = [... this.filterService.filter(this.sets, ['name', 'id'], this.searchedTerm, 'contains')];
    if (this.selectedSet != null && this.filteredSets.indexOf(this.selectedSet) < 0) {
      this.selectedSet = null;
    }
  }
}
