import { Cart, Book } from "./type";

type Props = {
  item: Cart;
  books: Book[];
  onDelete: () => void;
};
export default function CartItem({ item, books, onDelete }: Props) {
  const book = books.find((b) => b.id === item.bookId);

  return (
    <tr>
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
