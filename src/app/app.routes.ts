import { Routes } from '@angular/router';
import { BookList } from './books/components/book-list/book-list';


export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'books',
    component: BookList,
    title: 'Knihy'
  }
];
