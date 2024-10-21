import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./App.css";

import { Navbar, NavDropdown } from "react-bootstrap";
import { FaBook, FaShoppingCart } from "react-icons/fa";

export default function Root() {
  // console.log("Cart Items Data in APP:", cartItemsData);

  return (
    //navbar for the bookstore with section of books, managing books that have adding new and updating and also the cart.

    <Navbar expand="lg" sticky="top" className="p-3 custom-navbar">
      <Navbar.Brand>Bookstore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Books Section */}
          <Nav.Link as={NavLink} to="/" className="nav-link">
            <FaBook className="me-2" /> Books
          </Nav.Link>

          {/* Dropdown for other options */}
          <NavDropdown title="Manage Books" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/addBook">
              Add New Book
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/updateBook">
              Update Book
            </NavDropdown.Item>
          </NavDropdown>

          {/* Cart Section */}
          <Nav.Link as={NavLink} to="/cart" className="nav-link">
            <FaShoppingCart className="me-2" /> Cart
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
