import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book';
import { generateBooks } from '../book-generator';

@Component({
  selector: 'app-book-list',
  imports: [BookCard, MatButtonModule, MatIconModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  myBooks: Book[] = [{
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
// rovnako doplň knihy 2 a 3
    // naše 3 knihy – bez zmeny
  ];

  books: Book[] = this.myBooks.concat(generateBooks(40, 4));

  currentPage: number = 1;
  pageSize: number = 5;

  pageCount(): number {
    return Math.ceil(this.books.length / this.pageSize);
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
}