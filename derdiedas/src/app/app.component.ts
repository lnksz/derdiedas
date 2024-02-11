import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Was ist der Artikel für </h1>
  `,
  styleUrl: 'app.scss',
})
export class AppComponent {
  title = 'Der Die Das';
}
