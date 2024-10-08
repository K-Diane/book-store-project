import { useEffect } from "react";
import { Cart } from "./type";
import { Book } from "./type";
import cartItem from "./CartItem";

type Props = {
  cartItems: Cart[];
  setCartItems: (newValue: Cart[]) => void;
  books: Book[];
};

export default function CartList({ cartItems, setCartItems, books }: Props) {
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch("http://localhost:3000/cart");
      const data = await response.json();
      setCartItems(data);
    };
    asyncFunction();
  }, []);

  return (
    <table>
      <tbody>
        {cartItems.map((item) => (
          <cartItem key={item.id} item={item} books={books} />
        ))}
      </tbody>
    </table>
  );
}
