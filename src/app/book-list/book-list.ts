import { Component } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book';

@Component({
  imports: [BookCard],
  selector: 'app-book-list',
  styleUrl: './book-list.css',
  templateUrl: './book-list.html',
})
export class BookList {

  
  books: Book[] = [
    {
      id: 1,
      title: 'Hobit',
      author: 'J. R. R. Tolkien',
      year: 1937,
      available: true,
      genre: 'Fantasy'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      available: false,
      genre: 'Dystopia'
    },
    {
      id: 3,
      title: 'Malý princ',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
      available: true,
      genre: 'Fiction'
    }
  ];
}
