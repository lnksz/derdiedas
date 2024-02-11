import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { A11yModule } from '@angular/cdk/a11y'

export interface Word {
  word: string;
  article: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatInputModule, A11yModule],
  templateUrl: 'app.component.html',
  styleUrl: 'app.scss',
})
export class AppComponent {
  title = 'Der Die Das';
  res: Word = { word: '', article: '' };
  word = '';
  @ViewChild('wordInput') wordInput!: MatInputModule;

  onKey(value: string) {
    // This will suggest auto complete
    this.word = value;
  }
  onEnter(value: string) {
    // This will look up the word
    this.word = value;
    alert(this.word);
  }
}
