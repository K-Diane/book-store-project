import { useEffect } from "react";
import { Cart } from "./type";

import CartItem from "./CartItem";
import { useState } from "react";
import { Book } from "./type";

type Props = {
  books: Book[];
  setBooks: (newBook: Book[]) => void;
};

export default function CartListt({ books, setBooks }: Props) {
  console.log("CartList...", books);

  //State to store the list of items in the cart, initialized as an empty array
  // State to store the list of books, initialized as an empty array

  const [cartItemsData, setCartItems] = useState<Cart[]>([]);

  // useEffect to fetch cart and book data when the component mounts

  useEffect(() => {
    // Function to fetch the cart items from the API

    const fetchCart = async () => {
      try {
        const response = await fetch("http://localhost:3000/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart:" + response.status);
        }
        const data = await response.json();
        console.log(data); // Check what the API is returning
        /// Update the cartItemsData state with the fetched data
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        alert("Failed to fetch cart. Please try again later.");
      }
    };
    // Call the fetchCart function
    fetchCart();

    const fetchBooks = async () => {
      try {
        // Send a request to the books API
        const response = await fetch("http://localhost:3000/books");
        // If the response is not OK show an error
        if (!response.ok) {
          throw new Error("there was an error:" + response.status);
        }
        // Pass the response data as JSON and update the books state
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
        // Show an alert to the user if there's an error fetching books
        alert("Failed to fetch books. Please try again later.");
      }
    };
    // Call the fetchBooks function and empty array means the effect will only run once when the component called
    fetchBooks();
  }, []);

  // Function to handle deletion of a cart item
  const handleDelete = async (itemId: string) => {
    try {
      // Delete request to remove the item from the cart in the server (db.json)
      await fetch(`http://localhost:3000/cart/${itemId}`, {
        method: "DELETE",
      });

      // Update the cart state by removing the deleted item
      setCartItems(cartItemsData.filter((item) => item.id !== itemId));
    } catch (error) {
      // Log any error if the deletion fails
      console.error("Failed to delete item:", error);
    }
  };

  //Table to display cart items and Map through the cart items data and render each item
  // Pass the delete handler to the CartItem

  return (
    <>
      <h2 className="display-5 mb-4">
        <strong>Cart</strong>
      </h2>
      <table className="table table-striped">
        <tbody>
          {cartItemsData.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                books={books}
                onDelete={() => handleDelete(item.id)}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
}
