import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book';

@Pipe({
  name: 'bookFilter',
})
export class BookFilterPipe implements PipeTransform {
  transform(books: Book[], searchText = '', availability = 'all', favoritesOnly = false): Book[] {
    const text = searchText.trim().toLowerCase();

    let result = books.filter(book =>
      book.title.toLowerCase().includes(text) || book.author.toLowerCase().includes(text)
    );

    if (availability === 'available') {
      result = result.filter(book => book.available);
    } else if (availability === 'borrowed') {
      result = result.filter(book => !book.available);
    }

    if (favoritesOnly) {
      result = result.filter(book => book.favorite);
    }

    return result;
  }
}
