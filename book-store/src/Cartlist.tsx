import { useEffect } from "react";
import { Cart } from "./type";
import { Book } from "./type";
import CartItem from "./CartItem";

// import GetBooks from "./BookAPI";

type Props = {
  cartItemsData: Cart[];
  setCartItems: (newValue: Cart[]) => void;
  books: Book[];
};
export default function CartList({
  cartItemsData,
  setCartItems,
  books,
}: Props) {
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3000/cart");
      const data = await response.json();
      //   let data = GetBooks();
      setCartItems(data);
    };
    asyncFunction();
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
      console.error("Failed to delete item:", error);
    }
  };

  //   console.log("Cart Items Data:", cartItemsData);

  return (
    <>
      <h2 className="display-5 mb-4">
        <strong>Cart</strong>
      </h2>
      <table>
        <tbody>
          {cartItemsData.map((item) => {
            //   console.log("looping through cart items data:", item);

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
