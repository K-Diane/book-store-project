// Provides the CRUD operations for any component to pull in.
const apiEndpoint = "http://localhost:3000/cart";

//example: export a GET request for pulling in our books..
const GetBooks = async () => {
  const response = await fetch(apiEndpoint);
  const data = await response.json();
  // setCartItems(data);

  return data;
};

export default GetBooks;

//POST - requires the object of data you want to create

//PUT - requires the id of the object to update, along with the updated data

//DELETE - requires the id of the object you wish to delete

//Book Cart API requests...

//POST to the cart

//GET data about the cart
