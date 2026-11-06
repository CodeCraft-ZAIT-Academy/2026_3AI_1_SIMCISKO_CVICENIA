import { Component, inject } from '@angular/core';
import { Cart } from '../../components/cart/cart';
import { Book } from '../../../books/book';
import { BookService } from '../../../books/book.service';

@Component({
  selector: 'app-cart-page',
  imports: [Cart],
  templateUrl: './cart-page.html'
})
export class CartPage {
  private bookService = inject(BookService);

  readonly borrowedBooks = this.bookService.borrowedBooks;

  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
  }
}
