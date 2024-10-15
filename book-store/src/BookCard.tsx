import { useEffect, useState } from "react";

import { Cart } from "./type";
import { Book } from "./type";
import { Button } from "react-bootstrap";

import UpdateBookForm from "./UpdateBookForm";

// type Props = {
//   cartItemsData: Cart[];
//   setCartItems: (newValue: Cart[]) => void;
//   books: Book[];
//   setBooks: (newValue: Book[]) => void;
// };

// cartItemsData hold an empty array that will have a list of items users choose in the shoping cart
// books is an empty array that will help to fetch a list of books and sebooks will udate it after

export default function BookCard() {
  const [cartItemsData, setCartItems] = useState<Cart[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleForm = () => {
    setShowUpdateForm((prev) => !prev);
  };

  ///useEffect  ensures the books are fetched as soon as the component is called
  //function to fetch books data from an API
  // Send a request to the books API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");

        //// Check if the response is not ok

        if (!response.ok) {
          throw new Error("there was an error:" + response.status);
        }

        //pass the response data as JSON and update the books state
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        // // Show an alert to the user if there's an error fetching books
        alert("Failed to fetch books. Please try again later.");
      }
    };
    // Call the fetchBooks function and empty array to ensures it runs only once when the component called
    fetchBooks();
  }, []);

  //Adding the book to your cart, will require all of the book data ie. price, quanity, etc..
  const addToCart = async (bookId: string) => {
    const newBookInCart = {
      bookId: bookId,
      quantity: 1,
    };

    //// Send a POST request to the cart API to add the book to the cart and Send the cart item as JSON
    const response = await fetch("http://localhost:3000/cart", {
      method: "POST",
      body: JSON.stringify(newBookInCart),
      headers: {
        "content-Type": "application/json",
      },
    });

    //// Parse the newly created cart item from the response and Update the cartItemsData state by adding the new cart item to the array
    const newCreatedItem = await response.json();
    setCartItems([...cartItemsData, newCreatedItem]);
  };

  //// Function to delete a book and will send a DELETE request to the books API with the selected book's id
  const deleteBook = async (bookId: string) => {
    await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });

    //// After the deletion, update the books state by filtering out the deleted book
    setBooks(books.filter((b) => b.id !== bookId));
  };

  // rendering the BookCard component, it holds the welcome message and Map over the books array and render a card for each book
  //

  console.log("Toggling Update Form...", showUpdateForm);
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
                <strong>ID:</strong> {book.id}
              </p>
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
                onClick={() => addToCart(book.id)} // Add to cart when clicked
                className="btn btn-primary"
              >
                Add Book Cart
              </Button>

              {/* Button for deleting the book */}

              <Button
                onClick={() => deleteBook(book.id)} //// Delete book when clicked
                className="btn btn-danger mt-2"
              >
                Delete Book
              </Button>

              {/* Update Button */}
              <button
                type="submit"
                onClick={toggleForm}
                className="btn btn-secondary"
              >
                Show Update Form
              </button>
            </div>

            {/* Display Update Form When Enabled */}
            {showUpdateForm ? (
              <div></div>
            ) : (
              <>
                Form is showing{" "}
                <UpdateBookForm books={books} setBooks={setBooks} />
              </>
            )}
            {/* Update Form End */}
          </div>
        ))}
      </div>
    </>
  );
}
