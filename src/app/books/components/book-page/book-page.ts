import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { BookService } from '../../book.service';
import { BookDetail } from '../../components/book-detail/book-detail';

@Component({
  selector: 'app-book-page',
  imports: [
    RouterLink,
    MatCardModule,
    BookDetail
  ],
  templateUrl: './book-page.html'
})
export class BookPage {
  id = input.required<string>();

  private bookService = inject(BookService);

  readonly loading = this.bookService.loading;
  readonly loadError = this.bookService.loadError;

  readonly book = computed(() =>
    this.bookService.getBookById(Number(this.id()))
  );
}
