import { Cart, Book } from "./type";

type Props = {
  item: Cart;
  books: Book[];
};
export default function cartItem({ item, books }: Props) {
  const book = books.find((b) => b.id === item.bookId);

  return (
    <tr>
      <td>{book?.name}</td>
      <td>{book?.author}</td>
      <td>${book?.price}</td>
      <td>{item.quantity}</td>
    </tr>
  );
}
