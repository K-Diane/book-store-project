// tyoe for the cart

export type Cart = {
  id: string;
  bookId: string;
  quantity: string;
};

// type for the books, when adding the new book we will use the newbook one that doesnt requre ID as it will be generated itself by thesytstem
// and book type will be used on update and fetching

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
