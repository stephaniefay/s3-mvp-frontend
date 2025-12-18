import {Component, OnInit} from '@angular/core';
import {SetDisplayMiniComponent} from '../../components/set/set-display-mini/set-display-mini.component';
import {SetDisplayFullComponent} from '../../components/set/set-display-full/set-display-full.component';
import {FormsModule} from '@angular/forms';
import TCGdex, {Query, Set, SetResume} from '@tcgdex/sdk'
import {LanguageSelectorService} from '../../services/language-selector/language-selector-service';
import {DividerModule} from 'primeng/divider';
import {KeyValuePipe} from '@angular/common';
import {Select} from 'primeng/select';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-sets',
  imports: [
    SetDisplayMiniComponent,
    SetDisplayFullComponent,
    FormsModule,
    DividerModule,
    KeyValuePipe,
    Select,
    InputGroup,
    InputGroupAddon,
  ],
  templateUrl: './sets-page.component.html',
  styleUrl: './sets-page.component.css',
})
export class SetsPage implements OnInit {

  sets: SetResume[] = []
  serieMap = new Map<string, SetResume[]>();
  series: string[] = [];
  selectedSet: Set | null = null;
  selectedSerie: string | undefined;

  tcgdex: TCGdex | null = null;

  constructor(private language: LanguageSelectorService) {
  }

  ngOnInit() {
    this.tcgdex = new TCGdex(this.language.getLanguage());

    this.tcgdex.serie.list().then(series => {
      series.forEach(serie => {
        this.tcgdex?.set.list(Query.create().equal('serie.id', serie.id)).then(sets => {
          this.serieMap.set(serie.name, sets);
          this.series.push(serie.name);
        });
      });
    });
  }

  cardClick(clickedSet: SetResume) {
    // @ts-ignore
    this.tcgdex.set.get(clickedSet.id).then(set => {
      this.selectedSet = set;
    })
  }

  goToSection() {
    if (this.selectedSerie) {
      const element = document.getElementById(this.selectedSerie);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }
}
