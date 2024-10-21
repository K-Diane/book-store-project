import { useState } from "react";
import { Book, NewBook } from "./type";

type Props = {
  books: Book[];
  setBooks: (newBook: NewBook[]) => void;
};

export default function BookManagement({ books, setBooks }: Props) {
  // State to manage  the form is displayed
  const [showForm, setShowForm] = useState<boolean>(false);

  // State to manage the input fields for the new book detailed

  const [newBookName, setNewBookName] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookDetails, setNewBookDetails] = useState("");
  const [newBookCategory, setNewBookCategory] = useState("");
  const [newBookQuantity, setNewBookQuantity] = useState<number>(0);
  const [newBookPrice, setNewBookPrice] = useState("");
  const [newBookImageUrl, setNewBookImageUrl] = useState("");

  // Function to handle the addition of a new book, Prevent default form submission behavior and  Validate that all fields are filled in
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Adding a book...",
      newBookName,
      newBookAuthor,
      newBookDetails,
      newBookCategory,
      newBookQuantity,
      newBookPrice,
      newBookImageUrl
    );

    // check if  that all fields are filled in and the return is in case the validation fails.
    if (
      !newBookName ||
      !newBookAuthor ||
      !newBookDetails ||
      !newBookCategory ||
      !newBookQuantity ||
      !newBookPrice ||
      !newBookImageUrl
    ) {
      alert("Please fill all fields");
      return;
    }

    // Create a new book object and it will generate a new ID based on the current book count
    // Call the function to add the new book
    const newBook: NewBook = {
      // id: (books.length + 1).toString(),
      name: newBookName,
      author: newBookAuthor,
      details: newBookDetails,
      category: newBookCategory,
      quantity: newBookQuantity,
      price: newBookPrice,
      imageUrl: newBookImageUrl,
    };

    // Make the POST request to add the new book
    try {
      console.log("Sending book to server:", newBook); // Log the book data being sent
      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add book.");
      }

      // Call onAddBook to add the book to the database and get the response
      const addedBook = await response.json();
      console.log("Added Book:", addedBook);

      // Add the new book to the books state
      setBooks([...books, addedBook]);

      // Reset form fields and hide the form
      resetForm();
    } catch (error) {
      console.error("error adding the book:", error);
    }
  };

  // Function to reset form fields and hide the form
  const resetForm = () => {
    setNewBookName("");
    setNewBookAuthor("");
    setNewBookDetails("");
    setNewBookCategory("");
    setNewBookQuantity(1);
    setNewBookPrice("");
    setNewBookImageUrl("");
    setShowForm(false); // Hide the form
  };

  return (
    <div>
      <h2>Add New Book</h2>

      {showForm ? (
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="Book Name"
            value={newBookName}
            onChange={(e) => setNewBookName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Details"
            value={newBookDetails}
            onChange={(e) => setNewBookDetails(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newBookQuantity}
            onChange={(e) => setNewBookQuantity(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Price"
            value={newBookPrice}
            onChange={(e) => setNewBookPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBookImageUrl}
            onChange={(e) => setNewBookImageUrl(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add New Book
        </button>
      )}
    </div>
  );
}
