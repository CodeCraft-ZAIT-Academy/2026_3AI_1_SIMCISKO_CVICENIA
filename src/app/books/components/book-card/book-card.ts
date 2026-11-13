import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '../../book';
import { getGenreColor } from '../../../genre-colours';

@Component({
  selector: 'app-book-card',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book = input.required<Book>();

  borrowed = output<void>();
  returned = output<void>();
  favoriteToggled = output<void>();

  genreColor(): string {
    return getGenreColor(this.book().genre);
  }

  borrow(): void {
    this.borrowed.emit();
  }

  giveBack(): void {
    this.returned.emit();
  }

  toggleFavorite(): void {
    this.favoriteToggled.emit();
  }
}


