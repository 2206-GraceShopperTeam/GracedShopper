import React, {  useState } from "react";
import { createProduct } from "../axios-services";
import "./routineActivities.css";


const createProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    const newActivity = await createUserActivity(name, description,token);
    if('error' in newActivity){
      alert("An activity with that name already exists please try again!")
    } 
    else {
      console.log(newActivity, " were is the meat")
      alert("Activity was created!")
      setShowModal(false)
      return newActivity;
      }
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="routineDetails createActivity">
    <div className="routineDetailsTitle">Add New Activity<p className="xButton" onClick={()=>{setShowModal(false);}}>❌</p></div>
      <form >
        <div className="createForm">
          <textarea className="createField"
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            onChange={nameChange}
          />
          <textarea className="createField"
            type="text"
            name="description"
            placeholder="Description"
            required={true}
            onChange={descriptionChange}
          />
            <button type="submit" id="addActivityButton" onClick={handleSubmit}>CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default createActivity;