import Root from "./Root";
import BookCard from "./BookCard";
import CartList from "./Cartlist";
import { Book } from "./type";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import BookManagement from "./BookManagement";
import UpdateBookForm from "./UpdateBookForm";

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  // console.log("Cart Items Data in APP:", cartItemsData);

  return (
    <div className="container mt-3">
      {/* This is my navbar */}
      <Root />

      <Routes>
        <Route>
          <Route path="/" element={<BookCard />} />
          <Route path="/about" element={<BookCard />} />
          <Route
            path="/cart"
            element={<CartList books={books} setBooks={setBooks} />}
          />
          <Route
            path="/addBook"
            element={<BookManagement books={books} setBooks={setBooks} />}
          />
          {/* Add the route for Update Book */}
          <Route
            path="/updateBook"
            element={<UpdateBookForm books={books} setBooks={setBooks} />}
          />
        </Route>
      </Routes>
    </div>
  );
}
