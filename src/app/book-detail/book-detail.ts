import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../book';

@Component({
  selector: 'app-book-detail',
  imports: [MatChipsModule, MatDividerModule, MatIconModule],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail {
  book = input.required<Book>();
}