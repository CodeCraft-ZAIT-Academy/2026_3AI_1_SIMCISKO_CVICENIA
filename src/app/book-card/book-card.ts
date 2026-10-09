import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../book';
import { BookDetail } from '../book-detail/book-detail';



@Component({
  selector: 'app-book-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, BookDetail],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css'
})
export class BookCard {

  genreColor(): string {
    switch (this.book().genre) {
      case 'Fantasy':
        return '#7c3aed';
      case 'Science Fiction':
        return '#0891b2';
      case 'Mystery':
        return '#ca8a04';
      case 'Romance':
        return '#db2777';
      case 'Horror':
        return '#b91c1c';
      case 'Classic':
        return '#92400e';
      case "Children's Literature":
        return '#16a34a';
      default:
        return '#94a3b8';
    }
  }



  book = input.required<Book>();


  borrowed = output<void>();
  returned = output<void>();

  
  showDetails: boolean = false;
  favorite: boolean = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
  
  toggleFavorite(): void {
    this.book().favorite = !this.book().favorite;
  }


  borrow(): void {
    this.borrowed.emit();
  }
  
  giveBack(): void {
    this.returned.emit();
  }
}

