// export type Book = {
//   name: string;
//   author: string;
//   details: string;
//   category: string;
//   price: string;
//   quantity: number;
//   imageUrl: string;
//   id: string;
// };

export type Cart = {
  id: string;
  bookId: string;
  quantity: string;
};

// //to be used on adding new book
// export type NewBook = {
//   name: string;
//   author: string;
//   details: string;
//   category: string;
//   price: string;
//   quantity: number;
//   imageUrl: string;
// };

export type BookBase = {
  name: string;
  author: string;
  details: string;
  category: string;
  price: string;
  quantity: number;
  imageUrl: string;
};

export type Book = BookBase & { id: string };
export type NewBook = BookBase;
