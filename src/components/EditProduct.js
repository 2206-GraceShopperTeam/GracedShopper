// If you go to update a product but only want to change the brand, it won't work. You'll need to update something else along with the updated brand for the change to take place.

import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { BiWindowClose, BiTrash } from "react-icons/bi";
import { editProduct, getProductById } from "../axios-services";

const EditProduct = ({ setAlterProduct, setProduct, product, updated }) => {
  const [reload, setReload] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(
    product.description ? product.description : ""
  );
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [picture, setPicture] = useState(product.picture);
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.addEventListener("load", setReload(true));
    if ("undefined" in product || "null" in product || product.length === 0) {
      return;
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [updated]);

  const handleChange = async () => {
    const updatedProduct = await editProduct(product.id, token, {
      name,
      description,
      price,
      category,
      picture,
    });
    setProduct(updatedProduct);
    setEditPrice(false);
    setEditName(false);
    setEditDescription(false);
    updateSelectedProduct();
  };

  useEffect(() => {}, [updated]);

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };

  async function updateSelectedProduct() {
    try {
      const selectedProduct = await getProductById(product.id);
      selectedProduct ? setProduct(selectedProduct) : null;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="prodInfo">
      <div className={!editName ? "prodName" : "hidden"}>
        {product.name}
        <TbEdit className="editButton" onClick={() => setEditName(true)} />
      </div>
      <div className={editName ? "prodName edit" : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={product.name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">☑️</button>
          <BiTrash className="editButton" onClick={() => setEditName(false)} />
        </form>
        <TbEdit className="editButton" onClick={() => setEditName(false)} />
      </div>
      <div className={!editDescription ? "prodDescription" : "hidden"}>
        <b>Description: </b>
        {product.description}
        <TbEdit
          className="editButton"
          onClick={() => setEditDescription(true)}
        />
      </div>
      <div className={editDescription ? "productsDescription" : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={product.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">☑️</button>
          <BiTrash
            className="editButton"
            onClick={() => setEditDescription(false)}
          />
        </form>
        <TbEdit
          className="editButton"
          onClick={() => setEditDescription(false)}
        />
      </div>
      <div className={!editPrice ? "prodPrice" : "hidden"}>
        <b>Price: $</b>
        {product.price}
        <TbEdit className="editButton" onClick={() => setEditPrice(true)} />
      </div>
      <div className={editPrice ? "prodPrice" : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={product.price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              setEditPrice(false);
            }}
          >
            ☑️
          </button>
          <BiTrash className="editButton" onClick={() => setEditPrice(false)} />
        </form>
      </div>
      <div className={!editPicture ? "prodPicture" : "hidden"}>
        <img src={product.picture} className="productPicture" />
        <TbEdit className="editButton" onClick={() => setEditPicture(true)} />
        <div className={!editCategory ? "prodCategory" : "hidden"}>
          Brand: {`${product.category}`}
          <TbEdit
            className="editButton"
            onClick={() => setEditCategory(true)}
          />
        </div>
        <label className={editCategory ? "prodCategory" : "hidden"}>
          Choose a Brand:
        </label>
        <select
          id="brand"
          onChange={(e) => setPrice(e.target.value)}
          className={editCategory ? "prodCategory" : "hidden"}
        >
          <option value="DELL">DELL</option>
          <option value="HP">HP</option>
          <option value="ASUS">ASUS</option>
          <option value="Apple">Apple</option>
        </select>
        <button
          type="submit"
          className={editCategory ? "prodCategory" : "hidden"}
          onClick={() => {
            setEditCategory(false);
            setReload(!reload);
          }}
        >
          ☑️
        </button>
      </div>
      <div className={editPicture ? "prodPicture " : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={product.picture}
            onChange={(e) => setPicture(e.target.value)}
          />
          <button type="submit" onClick={() => setEditPicture(false)}>
            ☑️
          </button>
          <BiTrash
            className="editButton"
            onClick={() => setEditPicture(false)}
          />
        </form>
      </div>
      <BiWindowClose
        className="editButton"
        onClick={() => {
          setAlterProduct(false);
        }}
      />
    </div>
  );
};

export default EditProduct;
