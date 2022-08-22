import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { editUserInfo } from "../axios-services";

const UserInfo = ({ user, setUser, setUpdated, updated }) => {
  const [reload, setReload] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [address, setAddress] = useState(user.address ? user.address : "");
  useEffect(() => {
    document.addEventListener("load", setReload(true));
    if ("undefined" in user || "null" in user || user.length === 0) {
      return;
    } else {
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
    }
  }, [updated]);

  const handleChange = async (event) => {
    event.preventDefault();
    const updateUser = await editUserInfo(user.id, name, email, address);
    setUser(updateUser);
    localStorage.setItem("user", JSON.stringify(updateUser));
    setEditAddress(false);
    setEditName(false);
    setEditEmail(false);
    setUpdated(!updated);
  };

  return (
    <div className="userInfo">
      <div className={!editName ? "UsersName" : "hidden"}>
        <b>Username: </b>
        {user.name}
        <TbEdit className="editButton" onClick={() => setEditName(true)} />
      </div>
      <div className={!editEmail ? "UsersEmail" : "hidden"}>
        <b>Email: </b>
        {user.email}
        <TbEdit className="editButton" onClick={() => setEditEmail(true)} />
      </div>
      <div className={!editAddress ? "UsersAddress" : "hidden"}>
        <b>Address: </b>
        {user.address}
        <TbEdit className="editButton" onClick={() => setEditAddress(true)} />
      </div>
      <div className={editName ? "UsersName" : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={user.name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">☑️</button>
          <button onClick={() => setEditName(false)}>❌</button>
        </form>
        <TbEdit className="editButton" onClick={() => setEditName(false)} />
      </div>
      <div className={editEmail ? "UsersEmail" : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">☑️</button>
          <button onClick={() => setEditEmail(false)}>❌</button>
        </form>
        <TbEdit className="editButton" onClick={() => setEditEmail(false)} />
      </div>
      <div className={editAddress ? "UsersAddress" : "hidden"}>
        <form onSubmit={handleChange}>
          <input
            type="text"
            defaultValue={user.address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type="submit">☑️</button>
          <button onClick={() => setEditAddress(false)}>❌</button>
        </form>
        <TbEdit className="editButton" onClick={() => setEditAddress(false)} />
      </div>
    </div>
  );
};

export default UserInfo;
