import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { createProduct } from "../axios-services";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [picture, setPicture] = useState("");
  const [empty, setEmpty] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const newProduct = await createProduct(
      token,
      name,
      description,
      price,
      category,
      picture
    );
    if ("error" in newProduct) {
      alert("An product with that name already exists please try again!");
    } else {
      alert("product was created!");
      setName("");
      setDescription("");
      setPrice("");
      setPicture("");
      setCategory("");
      setEmpty(true);
      return newProduct;
    }
  };

  useEffect(()=>{},[empty])

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
      <div className="AddPTitle">
        Add New Product
       
      </div>
      <form className="addPF">
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
          className="createField"
            type="number"
            name="price"
            placeholder="Price"
            required={true}
            onChange={priceChange}
          />
          <label className="createField">Choose a Brand:</label>
          <select className="createField" id="brand" onChange={categoryChange}>
          <option value="">choose here</option>
            <option value="DELL">DELL</option>
            <option value="HP">HP</option>
            <option value="ASUS">ASUS</option>
            <option value="Apple">Apple</option>
          </select>
          <button type="submit" className="createField" onClick={handleSubmit}>
            CREATE
          </button>
        </div>
      </form>
      <p className="xButton" onClick={() => {navigate("/Products")}}>
          ❌
        </p>
    </div>
  );
};

export default AddProduct;
