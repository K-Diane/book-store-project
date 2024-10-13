import { useEffect } from "react";

import { Cart } from "./type";
import { Book } from "./type";
import { Button } from "react-bootstrap";

type Props = {
  cartItemsData: Cart[];
  setCartItems: (newValue: Cart[]) => void;
  books: Book[];
  setBooks: (newValue: Book[]) => void;
};

export default function BookCard({
  cartItemsData,
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

  //Adding the book to your cart, will require all of the book data ie. price, quanity, etc..
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
    setCartItems([...cartItemsData, newCreatedItem]);
  };

  const deleteBook = async (bookId: string) => {
    await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });
    setBooks(books.filter((b) => b.id !== bookId));
  };

  return (
    <>
      <h2 className="display-5 mb-4">
        <strong>Welcome to Readly!</strong>
      </h2>
      <p>
        Your go-to destination for buying books. Explore a vast collection, find
        amazing deals, and get your next great read delivered right to your
        door. Happy shopping!
      </p>
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

              {/* Button for adding an item to the cart */}
              <Button
                onClick={() => addToCart(book.id)}
                className="btn btn-primary"
              >
                Add Book Cart
              </Button>

              <Button
                onClick={() => deleteBook(book.id)}
                className="btn btn-danger mt-2"
              >
                Delete Book
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
