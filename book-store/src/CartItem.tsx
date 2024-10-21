import { Cart, Book } from "./type";

// cartiems props have item from the cart itself, list of all books and function to handle delete item on cart
type Props = {
  item: Cart;
  books: Book[];
  onDelete: () => void;
};

// The CartItem component receives item, books, and onDelete as props

// Find the book details in the books array that matches the bookId from the cart item
//Display the name of the book,the author,the price,the quantity using a table
//Delete button with an onClick handler that calls the onDelete function
export default function CartItem({ item, books, onDelete }: Props) {
  const book = books.find((b) => b.id === item.bookId);

  return (
    <tr>
      <td>{book?.id}</td>
      <td>{book?.name}</td>
      <td>{book?.author}</td>
      <td>${book?.price}</td>
      <td>{item.quantity}</td>
      <td>
        {" "}
        <button onClick={onDelete} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
}
