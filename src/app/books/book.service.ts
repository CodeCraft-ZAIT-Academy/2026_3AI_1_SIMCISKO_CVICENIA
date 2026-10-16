import { Injectable } from '@angular/core';
import { Book } from './book';
import { generateBooks } from './book-generator';

@Injectable({ providedIn: 'root' })
export class BookService {
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

  readonly maxBorrowed: number = 10;
  private books: Book[] = this.limitBorrowed(this.myBooks.concat(generateBooks(40, 4)));

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

  getBooks(): Book[] {
    return [...this.books];
  }

  addBook(book: Book): void {
    const maxId = Math.max(0, ...this.books.map(b => b.id));
    this.books = [{ ...book, id: maxId + 1 }, ...this.books];
  }

  updateBook(updated: Book): void {
    this.books = this.books.map(book => book.id === updated.id ? updated : book);
  }

  deleteBook(id: number): void {
    this.books = this.books.filter(book => book.id !== id);
  }

  borrowedBooks(): Book[] {
    return this.books.filter(book => !book.available);
  }

  borrowBook(id: number): boolean {
    if (this.borrowedBooks().length >= this.maxBorrowed) return false;
    this.books = this.books.map(book => book.id === id ? { ...book, available: false } : book);
    return true;
  }

  returnBook(id: number): void {
    this.books = this.books.map(book => book.id === id ? { ...book, available: true } : book);
  }

  toggleFavorite(id: number): void {
    this.books = this.books.map(book => book.id === id ? { ...book, favorite: !book.favorite } : book);
  }
}
