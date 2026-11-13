import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatSelectModule } from '@angular/material/select'; 
import { BookCard } from '../book-card/book-card';
import { Book } from '../../book';
import { BookService } from '../../book.service';
import { ServerBookList } from '../server-book-list/server-book-list';



@Component({
  selector: 'app-book-list',
  imports: [
    FormsModule,
    BookCard,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    ServerBookList,
    BookCard,
    FormsModule
    MatSelectModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);
 

  toggleFavoriteFilter(): void {
    this.favoriteOnly.update(value => !value);
    this.firstPage();
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


  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert('Knihu teraz nie je možné vypožičať.');
    }
  }
  
  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
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