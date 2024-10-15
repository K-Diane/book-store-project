import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Root() {
  // console.log("Cart Items Data in APP:", cartItemsData);

  return (
    <div className="container mt-3">
      <ul className="nav bg-light mb-3 border-bottom">
        <li className="nav-item">
          <Nav.Link as={NavLink} to="/" className="nav-link">
            <strong>Books</strong>
          </Nav.Link>
        </li>

        <li className="nav-item">
          <Nav.Link as={NavLink} to="/cart" className="nav-link">
            <strong>Cart</strong>
          </Nav.Link>
        </li>
        <li className="nav-item">
          <Nav.Link as={NavLink} to="/addBook" className="nav-link">
            <strong>Add Book</strong>
          </Nav.Link>
        </li>
      </ul>
    </div>
  );
}
