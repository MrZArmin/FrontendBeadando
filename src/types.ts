export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  price: string;
  [key: string]: string;
}
