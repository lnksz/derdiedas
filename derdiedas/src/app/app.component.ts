import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y'
import { LookupService, Word } from './lookup.service';
import { Observable, Subject, debounce, interval } from 'rxjs';

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
  searchInput$ = new Subject<string>();

  constructor(private lookupService: LookupService) {
    this.searchInput$.asObservable()
      .pipe(
        debounce(() => interval(this.debounceTime))
      )
      .subscribe(this.onKey)
  }

  onKey(value: string) {
    this.results = [];

    this.word = value.trim();
    if (this.word.length < this.limitSearchLengthTrigger) {
      this.results = [];
      return;
    }
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
