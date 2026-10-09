import { faker } from '@faker-js/faker';
import { Book } from './book';

export function generateBooks(count: number, firstId: number): Book[] {
  const books: Book[] = [];

  for (let i = 0; i < count; i++) {
    books.push({
        
        rating: faker.number.int({ min: 1, max: 5 }),
        pages: faker.number.int({ min: 80, max: 900 }),
        favorite: false,
      id: firstId + i,
      title: faker.book.title(),
      author: faker.book.author(),
      year: faker.number.int({ min: 1850, max: 2025 }),
      available: faker.datatype.boolean(),
      genre: faker.book.genre()
    });
  }

  return books;
}