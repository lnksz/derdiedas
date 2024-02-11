import { Injectable } from '@angular/core';
import { NOUNS } from './nouns'

export interface Word {
  word: string;
  article: string;
}

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  articleLut = new Map<string, string>([
    ['f', 'die'],
    ['m', 'der'],
    ['n', 'das']]);

  getPrefixed(prefix: string): Word[] {
    if (prefix === '') {
      return [];
    }
    let matches = NOUNS.filter(w => w.startsWith(prefix));
    const words = matches.map((term: string) => {
      const [word, articleCh] = term.split(',')
      const article = this.articleLut.get(articleCh) ?? '?';
      return {word: word, article: article};
    });
    return words;
  }
}
