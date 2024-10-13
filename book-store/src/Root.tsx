import BookCard from "./BookCard";
import CartList from "./Cartlist";
import { Cart } from "./type";
import { Book } from "./type";
import { useState } from "react";

export default function Root() {
  const [cartItemsData, setCartItems] = useState<Cart[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  console.log("Cart Items Data in APP:", cartItemsData);

  return (
    <div className="container mt-3">
      <CartList
        cartItemsData={cartItemsData}
        setCartItems={setCartItems}
        books={books}
      />

      <BookCard
        cartItemsData={cartItemsData}
        setCartItems={setCartItems}
        books={books}
        setBooks={setBooks}
      />
    </div>
  );
}
