import { Injectable } from '@angular/core';

export interface Word {
  word: string;
  article: string;
}

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  WORDS = [
    { word: 'Au', article: 'die' },
    { word: 'Auto', article: 'das' },
    { word: 'Buch', article: 'das' },
    { word: 'Busch', article: 'der' },
    { word: 'Fenster', article: 'das' },
    { word: 'Hamster', article: 'der' },
    { word: 'Haus', article: 'das' },
    { word: 'Lampe', article: 'die' },
    { word: 'Stift', article: 'der' },
    { word: 'Stuhl', article: 'der' },
    { word: 'Tisch', article: 'der' },
    { word: 'Tür', article: 'die' },
    { word: 'Wand', article: 'die' },
  ];

  get(word: string): Word {
    let r = this.WORDS.find(w => w.word === word);
    if (r) {
      return r;
    }
    else {
      return { word: word, article: '?' };
    }
  }
  getPrefixed(prefix: string): Word[] {
    if (prefix === '') {
      return [];
    }
    return this.WORDS.filter(w => w.word.startsWith(prefix));
  }
}
