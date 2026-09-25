import { Component, input } from '@angular/core';
import { Book } from '../book';


@Component({
  imports: [],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})

export class BookCard {
  book = input.required<Book>();
  showDetails: boolean = false;
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
