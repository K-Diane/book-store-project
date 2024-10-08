import BookCard from "./bookCard";
import CartList from "./cartlist";
import { Cart } from "./type";
import { Book } from "./type";
import { useState } from "react";

export default function App() {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  return (
    <div className="container mt-3">
      <h2 className="display-5 mb-4">
        <strong>Cart</strong>
      </h2>
      <CartList
        cartItems={cartItems}
        setCartItems={setCartItems}
        books={books}
      />

      <h2 className="display-5 mb-4">
        <strong>Welcome to Readly!</strong>
      </h2>
      <p>
        Your go-to destination for buying books. Explore a vast collection, find
        amazing deals, and get your next great read delivered right to your
        door. Happy shopping!
      </p>
      <BookCard
        cartItems={cartItems}
        setCartItems={setCartItems}
        books={books}
        setBooks={setBooks}
      />
    </div>
  );
}
