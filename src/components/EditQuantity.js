import React, { useState } from "react";
import { editCartProduct } from "../axios-services";

const EditQuantity = ({ thisProduct, setThisProduct, cartProductId }) => {
  const [editForm, setEditForm] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(thisProduct.quantity);

  const handleEdit = async (event) => {
    event.preventDefault();
    const result = await editCartProduct(cartProductId, quantity);

    if (result.error) {
      setError(result);
      setQuantity("");
    } else {
      setEditForm(false);
      setError(null);
      setThisProduct({
        ...thisProduct,
        quantity: result.quantity,
      });
      return result;
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
        <button type="submit">UPDATE</button>
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
