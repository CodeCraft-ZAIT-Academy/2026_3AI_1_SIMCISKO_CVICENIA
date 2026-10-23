import { Component, input, output, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../book';
import { BookDetail } from '../book-detail/book-detail';
import { BookForm } from '../book-form/book-form';
import { getGenreColour } from '../../genre-colors';



@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, BookForm, MatButtonModule, MatIconModule, BookDetail],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {
  book = input.required<Book>();

  borrowed = output<void>();
  returned = output<void>();
  edited = output<Book>(); 
  deleted = output<number>();

  readonly showDetails = signal(false);
  favorite: boolean = false;
  readonly editing = signal(false);
  readonly confirmingDelete = signal(false);

  toggleEdit(): void {
    this.editing.update(value => !value);
    this.confirmingDelete.set(false);
  }

  toggleDeleteConfirm(): void {
    this.confirmingDelete.update(value => !value);
    this.editing.set(false);
  }

  confirmDelete(): void {
    this.deleted.emit(this.book().id);
  }

  onSaveEdit(updatedBook: Book): void {
    this.edited.emit(updatedBook);
  this.editing.set(false);
  }
  genreColor(): string {
    return getGenreColor(this.book().genre);
  }

  toggleDetails(): void {
    this.showDetails.update(open => !open);
  }
  startEdit(): void { this.editing.set(true); }
saveEdit(book: Book): void {
  this.edited.emit(book);
  this.editing.set(false);
}
cancelEdit(): void { this.editing.set(false); }
askDelete(): void { this.confirmingDelete.set(true); }
cancelDelete(): void { this.confirmingDelete.set(false); }
  
  toggleFavorite(): void {
    this.book().favorite = !this.book().favorite;
  }

  borrow(): void {
    this.borrowed.emit();
  }
  
  giveBack(): void {
    this.returned.emit();
  }
}


