import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Book } from '../../../books/book';
import { BookService } from '../../../books/book.service';
import { BookForm } from '../../../books/components/book-form/book-form';

@Component({
  selector: 'app-admin-book-edit',
  imports: [
    RouterLink,
    BookForm
  ],
  templateUrl: './admin-book-edit.html'
})
export class AdminBookEdit {
  private bookService = inject(BookService);
  private router = inject(Router);

  id = input<string>();

  readonly isEditMode = computed(
    () => this.id() !== undefined
  );

  readonly book = computed(
    () => this.bookService.getBookById(Number(this.id()))
  );

  save(book: Book): void {
    if (this.isEditMode()) {
      this.bookService.updateBook(book);
    } else {
      this.bookService.addBook(book);
    }

    void this.router.navigate(['/admin']);
  }

  cancel(): void {
    void this.router.navigate(['/admin']);
  }
}