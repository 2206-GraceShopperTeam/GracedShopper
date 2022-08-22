import React, { useState } from "react";
import { createProduct } from "../axios-services";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("DELL");
  const [picture, setPicture] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const newProduct = await createProduct(token,name, description,price,category,picture);
    if ("error" in newProduct) {
      alert("An product with that name already exists please try again!");
    } else {
      alert("product was created!");
      return newProduct;
    }
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const priceChange = (event) => {
    setPrice(event.target.value);
  };
  const categoryChange = (event) => {
    setCategory(event.target.value);
  };

  const pictureChange = (event) => {
    setPicture(event.target.value);
  };

  return (
    <div className="AddProduct">
      <div className="routineDetailsTitle">
        Add New Product
        <p className="xButton" onClick={() => {}}>
          ❌
        </p>
      </div>
      <form>
        <div className="createForm">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            onChange={nameChange}
          />
          <textarea
            className="createField"
            type="text"
            name="description"
            placeholder="Description"
            required={true}
            onChange={descriptionChange}
          />
          <textarea
            className="createField"
            type="text"
            name="picture"
            placeholder="Picture: provide url"
            required={true}
            onChange={pictureChange}
          />
          <input 
            type="number"
            name="price"
            placeholder="Price"
            required={true}
            onChange={priceChange}
          />
          <label>Choose a Brand:</label>

          <select id="brand" onChange={categoryChange}>
            <option value="DELL">DELL</option>
            <option value="HP">HP</option>
            <option value="ASUS">ASUS</option>
            <option value="Apple">Apple</option>
          </select>
          <button type="submit" id="addActivityButton" onClick={handleSubmit}>
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
