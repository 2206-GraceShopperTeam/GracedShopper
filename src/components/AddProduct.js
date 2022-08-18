import React, { useState } from "react";
import { createProduct } from "../axios-services";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const newActivity = await createUserActivity(name, description, token);
    if ("error" in newActivity) {
      alert("An activity with that name already exists please try again!");
    } else {
      console.log(newActivity, " were is the meat");
      alert("Activity was created!");
      setShowModal(false);
      return newActivity;
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

  return (
    <div className="AddProduct">
      <div className="routineDetailsTitle">
        Add New Product
        <p
          className="xButton"
          onClick={() => {
            setShowModal(false);
          }}
        >
          ❌
        </p>
      </div>
      <form>
        <div className="createForm">
          <textarea
            className="createField"
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
            type="number"
            name="price"
            placeholder="Price"
            required={true}
            onChange={priceChange}
          />
          <textarea
            className="createField"
            type="text"
            name="description"
            placeholder="Description"
            required={true}
            onChange={descriptionChange}
          />
          <label for="cars">Choose a Brand:</label>

          <select id="cars">
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
