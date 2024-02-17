import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y'
import { LookupService, Word } from './lookup.service';
import { Observable } from 'rxjs';

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
  limitSearchLengthTrigger = 2;
  lastTakenKeyAt = Date.now();
  debounceTime = 200; //ms

  constructor(private lookupService: LookupService) { }

  onKey(value: string) {
    const nowPressedAt = Date.now();
    this.results = [];
    if (nowPressedAt - this.lastTakenKeyAt < this.debounceTime)
      return;
    else
      this.lastTakenKeyAt = nowPressedAt;

    this.word = value.trim();
    if (this.word.length < this.limitSearchLengthTrigger) {
      this.results = [];
      return;
    }
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
