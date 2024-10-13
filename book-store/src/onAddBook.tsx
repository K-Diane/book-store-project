import { useEffect } from "react";
import { Book } from "./type";

// this is a single book object
type Props = {
  newBook: Book;
};

export default function onAddBook({ newBook }: Props) {
  useEffect(() => {
    // Define the async function inside useEffect
    const addBookFunction = async () => {
      try {
        // Make the POST request to add the new book
        const response = await fetch("http://localhost:3000/books", {
          method: "POST",
          body: JSON.stringify(newBook),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if the response is not OK (status outside 200-299)
        if (!response.ok) {
          throw new Error("Failed to add book.");
        }

        // check the JSON response
        const addedBook = await response.json();
        console.log("Added Book:", addedBook);
      } catch (error) {
        console.error("Error adding the book:", error);
      }
    };

    // Call the async function
    addBookFunction();
  }, [newBook]); // Dependency array to run the effect when newBook changes
}
