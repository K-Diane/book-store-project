import { useState } from "react";
import { Book } from "./type";

type Props = {
  // cartItemsData: Cart[];
  // setCartItems: (newValue: Cart[]) => void;
  books: Book[];
  setBooks: (newValue: Book[]) => void;
};

export default function updateBookForm({
  // cartItemsData,
  // setCartItems,
  books,
  setBooks,
}: Props) {
  const [selectedBook, setSelectedBook] = useState<Book>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBook) {
      setSelectedBook({ ...selectedBook, [e.target.name]: e.target.value });
    }
  };

  const handleSelectBook = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const book = books.find((b) => b.id === e.target.value);
    setSelectedBook(book);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook) {
      const response = await fetch(
        `http://localhost:3000/books/${selectedBook.id}`,
        {
          method: "PUT",
          body: JSON.stringify(selectedBook),
          headers: { "Content-Type": "application/json" },
        }
      );
      const updatedBook = await response.json();
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
              {book.name}
            </option>
          ))}
        </select>
      </div>

      {selectedBook && (
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

  // const [editingBook, setEditingBook] = useState<Book[]>([]);
  // const [formData, setFormData] = useState("");

  // useEffect(() => {
  //   const fetchBooks = async ()  => {
  //     const response = await fetch("http://localhost:3000/books");
  //     const data = await response.json();
  //     setBooks(data);
  //   };
  //   fetchBooks();
  // }, [setBooks]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const updateBook = async (bookId: string) => {
  //   const response = await fetch(`http://localhost:3000/books/${bookId}`, {
  //     method: "PUT",
  //     body: JSON.stringify(formData),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (response.ok) {
  //     throw new Error("Failed to update book");
  //   }

  //   const updatedBook = await response.json();
  //   // Update the local state
  //   setBooks((prevBooks) =>
  //     prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
  //   );
  //   setEditingBook(books); // Clear editing state after update
  //   setFormData({}); // Clear form data after updating
  // } catch (error) {
  //   console.error(error);
  // }
  // const handleEditBook = (book:Book) => {
  //   // e.preventDefault()
  //   setEditingBook(book);
  //   setFormData({
  //     details: book.details,
  //     quantity: book.quantity,
  //     price: book.price,
  // });
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (editingBook) {
  //     updateBook(editingBook.id);
  //   }
  // };

  // return (
  //   <div>
  //     <h2>Edit Book</h2>

  //     {editingBook && (
  //       <form onSubmit={handleSubmit}>

  //           <input
  //           type="text"
  //           name="details"
  //           value={formData.details || ""}
  //           onChange={handleInputChange}
  //           placeholder="details"

  //         />
  //           <input
  //           type="number"
  //           name="quantity"
  //           value={formData.quantity || ""}
  //           onChange={handleInputChange}
  //           placeholder="quantity"

  //         />
  //           <input
  //           type="text"
  //           name="price"
  //           value={formData.price || ""}
  //           onChange={handleInputChange}
  //           placeholder="price"

  //         />

  //         <button type="submit">Update Book</button>
  //         <button type="button" onClick={() => setEditingBook(books)}>
  //           Cancel
  //         </button>
  //     </form>
  //     )}
  //     <h2>Books</h2>
  //     <ul>
  //       {books.map((book) => (
  //         <li key={book.id}>
  //           {book.details}
  //           ${book.price}
  //           {book.quantity}
  //           <button onClick={() => handleEditBook(book)}>Edit</button>
  //         </li>
  //       ))}
  //     </ul>

  //   </div>
  // )
}
