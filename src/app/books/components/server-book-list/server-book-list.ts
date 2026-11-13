import { Component, inject, OnInit, signal } from '@angular/core';
import { BookApiService } from '../../book-api.service';
import { Book } from '../../book';

@Component({
  selector: 'app-server-book-list',
  templateUrl: './server-book-list.html',
  styleUrl: './server-book-list.css'
})
export class ServerBookList implements OnInit {
  private readonly bookApi = inject(BookApiService);

  readonly books = signal<Book[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit(): void {
    this.bookApi.getBooks().subscribe({
      next: books => {
        this.books.set(books);
        this.loading.set(false);
      },
      error: error => {
        console.error('Načítanie kníh zo servera zlyhalo:', error);
        this.error.set('Knihy sa nepodarilo načítať. Skontroluj, či JSON Server beží.');
        this.loading.set(false);
      }
    });
  }
}
