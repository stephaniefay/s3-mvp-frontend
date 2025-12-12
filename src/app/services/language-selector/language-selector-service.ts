import { Injectable } from '@angular/core';
import {SupportedLanguages} from '@tcgdex/sdk';

@Injectable({
  providedIn: 'root',
})
export class LanguageSelectorService {

  supportedArray: string[] = ['en', 'fr', 'es', 'it', 'pt', 'de'];

  getLanguage (): SupportedLanguages {
    const language = localStorage.getItem('language');

    if (language && this.isSupportedLanguage(language)) {
      return language;
    }

    return 'en';
  }

  isSupportedLanguage(value: string): value is SupportedLanguages {
    return this.supportedArray.includes(value);
  }

}
