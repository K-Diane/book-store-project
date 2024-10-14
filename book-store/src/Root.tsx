import { NavLink } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  // console.log("Cart Items Data in APP:", cartItemsData);

  return (
    <div className="container mt-3">
      <ul className="nav bg-light mb-3 border-bottom">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">
            <strong>Books</strong>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">
            <strong>Cart</strong>
          </NavLink>
        </li>
      </ul>

      {/* <ul className="nav bg-light mb-3 border-bottom">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <strong>Books</strong>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/cart" className="nav-link">
            <strong>Cart</strong>
          </Link>
        </li>
      </ul> */}
      <Outlet />
    </div>
  );
}
