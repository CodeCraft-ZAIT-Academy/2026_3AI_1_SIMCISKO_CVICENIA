import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Book } from '../../../books/book';
import { BookService } from '../../../books/book.service';

@Component({
  selector: 'app-admin-books',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin-books.html',
  styleUrl: './admin-books.css'
})
export class AdminBooks {
  private bookService = inject(BookService);

  readonly books = this.bookService.books;
  readonly loading = this.bookService.loading;
  readonly loadError = this.bookService.loadError;

  readonly confirmingDeleteId = signal<number | undefined>(undefined);

  askDelete(book: Book): void {
    this.confirmingDeleteId.set(book.id);
  }

  cancelDelete(): void {
    this.confirmingDeleteId.set(undefined);
  }

  confirmDelete(book: Book): void {
    this.bookService.deleteBook(book.id);
    this.confirmingDeleteId.set(undefined);
  }
}
