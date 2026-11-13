import { Routes } from '@angular/router';

import { BookList } from './books/components/book-list/book-list';
import { BookPage } from './books/components/book-page/book-page';
import { CartPage } from './cart/components/cart-page/cart-page';

import { AdminBooks } from './admin/components/admin-books/admin-books';
import { AdminBookEdit } from './admin/components/admin-book-edit/admin-book-edit';

import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },

  {
    path: 'books',
    component: BookList,
    title: 'Knihy'
  },

  {
    path: 'books/:id',
    component: BookPage,
    title: 'Detail knihy'
  },

  {
    path: 'cart',
    component: CartPage,
    title: 'Košík'
  },

  {
    path: 'admin',
    component: AdminBooks,
    title: 'Správa kníh'
  },

  {
    path: 'admin/new',
    component: AdminBookEdit,
    title: 'Nová kniha'
  },

  {
    path: 'admin/:id/edit',
    component: AdminBookEdit,
    title: 'Úprava knihy'
  },

  {
    path: '**',
    component: NotFound,
    title: 'Stránka sa nenašla'
  }

];
