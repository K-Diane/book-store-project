import { useEffect, useState } from "react";

import { Cart } from "./type";
import { Book } from "./type";

type Props = {
  cartItems: Cart[];
  setCartItems: (newValue: Cart[]) => void;
  books: Book[];
  setBooks: (newValue: Book[]) => void;
};

export default function BookCard({
  cartItems,
  setCartItems,
  books,
  setBooks,
}: Props) {
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3000/books");
      const data = await response.json();
      setBooks(data);
    };
    asyncFunction();
  }, []);

  const addToCart = async (bookId: string) => {
    const newBookInCart = {
      bookId: bookId,
      quantity: 1,
    };

    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      body: JSON.stringify(newBookInCart),
      headers: {
        "content-Type": "application/json",
      },
    });

    const newCreatedItem = await response.json();
    setCartItems([...cartItems, newCreatedItem]);
  };
  return (
    <div className="d-flex flex-wrap gap-4">
      {books.map((book) => (
        <div
          key={book.id}
          className="card flex-wrap-grow-1"
          style={{ width: "18rem" }}
        >
          <img
            src={book.imageUrl}
            alt={book.name}
            className="book-image card-img-top"
          />

          <div className="card-body">
            <h2 className="card-title">{book.name}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p className="card-text">
              <strong>Details:</strong> {book.details}
            </p>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            <p>
              <strong>Quantity:</strong> {book.quantity}
            </p>
            <p>
              <strong>Price:</strong> ${book.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
