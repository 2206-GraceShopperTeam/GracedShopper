import React, { useState } from "react";
import { editCartProduct } from "../axios-services";

const EditQuantity = ({
  thisProduct,
  cart,
  setCartInfo,
  cartInfo,
  loggedIn,
}) => {
  const [editForm, setEditForm] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [quantity, setQuantity] = useState(
    thisProduct ? thisProduct.quantity : 1
  );

  const handleEdit = async (event) => {
    event.preventDefault();
    setEditForm(false);
    setError(null);

    if (!loggedIn) {
      const searchCart = cart.find(
        (product) => product.name === thisProduct.name
      );
      if (searchCart) {
        searchCart.quantity = quantity;
        setCartInfo(!cartInfo);
      }
    }

    if (loggedIn) {
      const searchCart = cart.find(
        (product) => product.name === thisProduct.name
      );
      if (searchCart) {
        await editCartProduct(searchCart.id, quantity);
        setCartInfo(!cartInfo);
      }
    }
  };

  const quantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const editFormFunc = (thisProduct) => {
    return (
      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="count"
          defaultValue={thisProduct.quantity}
          required={true}
          onChange={quantityChange}
        />
        <button
          type="submit"
          onClick={() => {
            setCartInfo(!cartInfo);
            setRefresh(true);
          }}
        >
          UPDATE
        </button>
      </form>
    );
  };

  const cancelEdit = () => {
    return (
      <div>
        <button
          onClick={() => {
            setEditForm(false);
            setError("");
          }}
        >
          Cancel Edit
        </button>
      </div>
    );
  };

  const regEdit = () => {
    return (
      <div>
        <button
          onClick={() => {
            setEditForm(true);
          }}
        >
          Edit Quantity
        </button>
      </div>
    );
  };

  return (
    <div>
      {editForm ? cancelEdit() : regEdit()}
      {editForm ? editFormFunc(thisProduct) : null}
      {error && error.message ? "Please refresh page and try again." : null}
    </div>
  );
};

export default EditQuantity;
