import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatSelectModule } from '@angular/material/select'; 
import { BookCard } from '../book-card/book-card';
import { Book } from '../../book';
import { generateBooks } from '../../book-generator';
import { Cart } from '../../../cart/components/cart/cart';
import { BookForm } from '../book-form/book-form';
import { BookService } from '../../book.service';



@Component({
  selector: 'app-book-list',
  imports: [
    FormsModule,
    BookCard,
    Cart,
    BookForm,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSelectModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);
  myBooks: Book[] = [
    { id: 1, title: 'Hobit', author: 'J. R. R. Tolkien', year: 1937, available: true, genre: 'Fantasy', rating: 5, pages: 310, favorite: false },
    { id: 2, title: '1984', author: 'George Orwell', year: 1947, available: false, genre: 'Dystopia', rating: 5, pages: 310, favorite: false },
    { id: 3, title: 'Malý Princ', author: 'Exupéry', year: 1943, available: true, genre: 'Fiction', rating: 5, pages: 310, favorite: false }
  ];

  readonly maxBorrowed = this.bookService.maxBorrowed;
  books: Book[] = this.bookService.getBooks();

  toggleFavoriteFilter(): void {
    this.favoriteOnly.update(value => !value);
    this.firstPage();
  }
  

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

  
  readonly searchText = signal('');
  readonly availabilityFilter = signal('all');
  readonly sortBy = signal('none');

  readonly currentPage = signal(1);
  readonly pageSize = signal(5);
  readonly pageSizes = [5, 10, 20];


  readonly visibleBooks = computed(() => {
    let books = this.bookService.getFilteredBooks(
      this.searchText(),
      this.availabilityFilter(),
      this.sortBy()
    );

    if (this.favoriteOnly()) {
      books = books.filter(book => book.favorite);
    }

    return books;
  });
  onFilterChange(): void {
    this.currentPage.set(1);
  }

  clearSearch(): void {
    this.searchText.set('');
    this.firstPage();
  }
  readonly totalBooks = computed(() => this.bookService.books().length);
  readonly availableBooks = this.bookService.availableBooks;

  resetFilters(): void {
    this.searchText.set('');
    this.availabilityFilter.set('all');
    this.sortBy.set('none');
    this.favoriteOnly.set(false);
        this.firstPage();
  }

  readonly favoriteOnly = signal(false);
  

readonly pageCount = computed(() =>
  Math.max(1, Math.ceil(this.visibleBooks().length / this.pageSize()))
);
readonly firstShown = computed(() =>
  (this.currentPage() - 1) * this.pageSize() + 1
);
readonly lastShown = computed(() =>
  Math.min(this.currentPage() * this.pageSize(), this.visibleBooks().length)
);
readonly pages = computed(() =>
  Array.from({ length: this.pageCount() }, (_, i) => i + 1)
);

isOnCurrentPage(index: number): boolean {
  const start = (this.currentPage() - 1) * this.pageSize();
  return index >= start && index < start + this.pageSize();
}

previousPage(): void {
  this.currentPage.update(p => Math.max(1, p - 1));
}

  nextPage(): void {
    this.currentPage.update(p => Math.min(this.pageCount(), p + 1));
  }

  readonly borrowedBooks = this.bookService.borrowedBooks;

  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert('Knihu teraz nie je možné vypožičať.');
    }
  }
  
  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
  }

  addBook(book: Book): void {
    this.bookService.addBook(book);
    this.firstPage();
  }
  
  updateBook(updated: Book): void {
    this.bookService.updateBook(updated);
  }

  deleteBook(deleted: Book): void {
    this.bookService.deleteBook(deleted.id);
    if (this.currentPage() > this.pageCount()) {
      this.lastPage();
    }
  }

  refreshBooks(): void {
    this.books = this.bookService.getBooks();
  }

  toggleFavorite(book: Book): void {
    this.bookService.toggleFavorite(book.id);
  }
  

  firstPage(): void { this.currentPage.set(1); }
lastPage(): void { this.currentPage.set(this.pageCount()); }


goToPage(page: number): void {
  this.currentPage.set(Math.max(1, Math.min(page, this.pageCount())));
}
setPageSize(size: number): void {
  this.pageSize.set(size);
  this.firstPage();
}


  
}