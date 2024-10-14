import { useState } from "react";
import { Book } from "./type";

type Props = {
  books: Book[];
  setBooks: (newValue: Book[]) => void;
};

export default function updateBookForm({ books, setBooks }: Props) {
  const [selectedBook, setSelectedBook] = useState<Book>();

  // Handles input field changes for the selected book and  Update the selected books
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value });
    }
  };

  // Handles selecting a book
  const handleSelectBook = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //Find the selected book by its ID
    const book = books.find((b) => b.id === e.target.value);
    // Set the selected book
    setSelectedBook(book);
  };

  //// Handles form submission to update the book and Prevent default form submission behavior
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook) {
      // Make the PUT request to update the book
      const response = await fetch(
        `http://localhost:3000/books/${selectedBook.id}`,
        {
          method: "PUT",
          body: JSON.stringify(selectedBook), // Send the updated book data
          headers: { "Content-Type": "application/json" },
        }
      );
      // Pass the response JSON
      const updatedBook = await response.json();
      //// Update the books state with the new book data
      setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Book</h3>
      <div>
        <label>Select Book:</label>
        <select onChange={handleSelectBook}>
          <option value="">--Select a Book--</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name} {/* Display the book name in the dropdown */}
            </option>
          ))}
        </select>
      </div>

      {selectedBook && ( // Only show the input fields if a book is selected
        <>
          <div>
            <label>Book Name:</label>
            <input
              type="text"
              name="name"
              value={selectedBook.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              value={selectedBook.author}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Details:</label>
            <input
              type="text"
              name="details"
              value={selectedBook.details}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={selectedBook.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={selectedBook.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={selectedBook.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={selectedBook.imageUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Update Book</button>
        </>
      )}
    </form>
  );
}
