import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { BookCard } from '../book-card/book-card';
import { BookForm } from '../book-form/book-form';
import { Cart } from '../../../cart/components/cart/cart';
import { Book } from '../../book';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-list',
  imports: [
    BookCard,
    BookForm,
    Cart,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);
  maxBorrowed: number = this.bookService.maxBorrowed;
  books: Book[] = this.bookService.getBooks();

  refreshBooks(): void {
    this.books = this.bookService.getBooks();
  }

  searchText: string = '';
  availability: string = 'all';
  sortBy: string = 'none';

  visibleBooks(): Book[] {
    const text = this.searchText.trim().toLowerCase();

    let result = this.books.filter(book =>
      book.title.toLowerCase().includes(text) || book.author.toLowerCase().includes(text)
    );

    if (this.availability === 'available') {
      result = result.filter(book => book.available);
    } else if (this.availability === 'borrowed') {
      result = result.filter(book => !book.available);
    }

    switch (this.sortBy) {
      case 'title':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        result = [...result].sort((a, b) => b.year - a.year);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }

  clearSearch(): void {
    this.searchText = '';
    this.firstPage();
  }

  addBook(book: Book): void {
    this.bookService.addBook(book);
    this.refreshBooks();
    this.firstPage();
  }

  updateBook(updated: Book): void {
    this.bookService.updateBook(updated);
    this.refreshBooks();
  }

  deleteBook(deleted: Book): void {
    this.bookService.deleteBook(deleted.id);
    this.refreshBooks();
    if (this.currentPage > this.pageCount()) this.lastPage();
  }

  borrowedBooks(): Book[] {
    return this.bookService.borrowedBooks();
  }

  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert(`Naraz môžeš mať požičaných najviac ${this.maxBorrowed} kníh. Najskôr nejakú vráť.`);
      return;
    }
    this.refreshBooks();
  }

  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
    this.refreshBooks();
  }

  toggleFavorite(book: Book): void {
    this.bookService.toggleFavorite(book.id);
    this.refreshBooks();
  }

  currentPage: number = 1;
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20];

  pageCount(): number {
    return Math.max(1, Math.ceil(this.visibleBooks().length / this.pageSize));
  }

  isOnCurrentPage(index: number): boolean {
    const start = (this.currentPage - 1) * this.pageSize;
    return index >= start && index < start + this.pageSize;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount()) {
      this.currentPage++;
    }
  }

  firstPage(): void {
    this.currentPage = 1;
  }

  lastPage(): void {
    this.currentPage = this.pageCount();
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  setPageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 1;
  }

  firstShown(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  lastShown(): number {
    return Math.min(this.currentPage * this.pageSize, this.visibleBooks().length);
  }

  pages(): number[] {
    const result: number[] = [];

    for (let page = 1; page <= this.pageCount(); page++) {
      result.push(page);
    }

    return result;
  }
}
