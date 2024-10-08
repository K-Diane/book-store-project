export type Book = {
  name: string;
  author: string;
  details: string;
  category: string;
  price: string;
  quantity: number;
  imageUrl: string;
  id: string;
};

export type Cart = {
  id: string;
  bookId: string;
  quantity: string;
};
