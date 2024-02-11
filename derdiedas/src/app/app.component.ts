import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y'
import { LookupService, Word } from './lookup.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatInputModule, A11yModule],
  templateUrl: 'app.component.html',
  styleUrl: 'app.scss',
})
export class AppComponent {
  title = 'Der Die Das';
  results: Word[] = [];
  word = '';

  constructor(private lookupService: LookupService) { }

  onKey(value: string) {
    this.word = value.trim();
    // this.res = this.lookupService.get(this.word);
    let results = this.lookupService.getPrefixed(this.word);
    if (results.length === 0) {
      this.results = [];
      return;
    }
    if (results.length === 1) {
      this.results = results;
      return;
    }
    if (results.find(w => w.word === this.word)) {
      this.results = results.filter(w => w.word === this.word);
      return;
    }
    this.results = results;
  }
}
