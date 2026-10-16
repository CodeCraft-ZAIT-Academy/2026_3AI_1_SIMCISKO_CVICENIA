import { Component } from '@angular/core';
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
import { generateBooks } from '../../book-generator';

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
  myBooks: Book[] = [
    {
      id: 1,
      title: 'Hobit',
      author: 'J. R. R. Tolkien',
      year: 1937,
      available: true,
      genre: 'Fantasy',
      rating: 5,
      pages: 310,
      favorite: false
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      available: false,
      genre: 'Dystopia',
      rating: 4,
      pages: 328,
      favorite: false
    },
    {
      id: 3,
      title: 'Malý princ',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
      available: true,
      genre: 'Fiction',
      rating: 5,
      pages: 96,
      favorite: false
    }
  ];

  maxBorrowed: number = 10;

  books: Book[] = this.limitBorrowed(this.myBooks.concat(generateBooks(40, 4)));

  limitBorrowed(books: Book[]): Book[] {
    let borrowedCount = 0;

    return books.map(book => {
      if (book.available) {
        return book;
      }

      borrowedCount++;

      if (borrowedCount > this.maxBorrowed) {
        return { ...book, available: true };
      }

      return book;
    });
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
    const maxId = Math.max(0, ...this.books.map(b => b.id));
    this.books = [{ ...book, id: maxId + 1 }, ...this.books];
    this.firstPage();
  }

  updateBook(updated: Book): void {
    this.books = this.books.map(book => book.id === updated.id ? updated : book);
  }

  deleteBook(deleted: Book): void {
    this.books = this.books.filter(book => book.id !== deleted.id);

    if (this.currentPage > this.pageCount()) {
      this.lastPage();
    }
  }

  borrowedBooks(): Book[] {
    return this.books.filter(book => !book.available);
  }

  borrow(book: Book): void {
    if (this.borrowedBooks().length >= this.maxBorrowed) {
      alert(`Naraz môžeš mať požičaných najviac ${this.maxBorrowed} kníh. Najskôr nejakú vráť.`);
      return;
    }

    const index = this.books.indexOf(book);
    this.books[index] = { ...book, available: false };
  }

  giveBack(book: Book): void {
    const index = this.books.indexOf(book);
    this.books[index] = { ...book, available: true };
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