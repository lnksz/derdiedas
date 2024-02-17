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
  resultLimit = 50;
  articleLut = new Map<string, string>([
    ['f', 'die'],
    ['m', 'der'],
    ['n', 'das']]);

  getPrefixed(prefix: string): Word[] {
    if (prefix === '') {
      return [];
    }
    console.debug('looking up ', prefix);
    console.time("lookup");
    let matches = NOUNS.filter(w => w.startsWith(prefix));
    console.debug("Matches", matches.length);
    const words = matches.map((term: string) => {
      const [word, articleCh] = term.split(',')
      const article = this.articleLut.get(articleCh) ?? '?';
      return {word: word, article: article};
    });
    console.timeEnd("lookup");
    if (words.length > this.resultLimit)
      return words.slice(0, this.resultLimit);
    return words;
  }
}
