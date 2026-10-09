import { Component, input, output } from '@angular/core';
import { Book } from '../../../books/book';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
selector: 'app-cart',
imports: [
  MatCardModule,
  MatButtonModule,
  MatIconModule
  ],
templateUrl: './cart.html',
styleUrl: './cart.css'
})



export class Cart {

books = input.required<Book[]>();

returned = output<Book>();



giveBack(book: Book): void {
this.returned.emit(book);
}

}


