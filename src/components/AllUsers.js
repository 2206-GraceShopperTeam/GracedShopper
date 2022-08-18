import React, {useState,useEffect} from "react";
import { getAllUsers } from "../axios-services";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const token = localStorage.getItem("token")

  useEffect(() => {
    async function fetchUsers() {
      const returnUsers = await getAllUsers();
      setAllUsers(returnUsers);
    }
    fetchUsers();
  }, []);

  return (
    <div className="products">
      {allUsers.length
        ? allUsers.map((user) => {
            return (
              <div
                className="allUsers"
                key={`Users${user.id}`}
              >
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Address: {user.address ? user.address : "Unknown"}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Users;
