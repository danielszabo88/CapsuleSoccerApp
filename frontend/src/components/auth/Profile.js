import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Profile = () => {
  const [fruits, setFruits] = useState([]);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/fruits").then((response) => setFruits(response.data));
  }, []);

  const userDelete = () => {
    axios
      .delete("/api/users/profile", {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/fruitlist"));

    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <h1>User Profile of {userData.user.name}</h1>
      <br />
      <h5>
        <b>User ID: </b>
        {userData.user.id}
      </h5>
      <h5>
        <b>Register Date: </b>
        {userData.user.date.toString().slice(0, 10) +
          " @ " +
          userData.user.date.toString().slice(11, 19)}
      </h5>
      <br />
      <h3>
        <b>Fruits Added by {userData.user.name}:</b>
      </h3>

      <ul style={{ listStyleType: "none" }}>
        {fruits
          .filter((fruit) => {
            if (fruit.addedBy === userData.user.name) {
              return fruit;
            }
          })
          .map((fruit) => {
            return (
              <li key={fruit._id}>
                <Link to={`/fruit/${fruit._id}`}>
                  <b>{fruit.name}</b>
                </Link>{" "}
                ({fruit.amount}) - {fruit.info}
                &nbsp;[Added on{" "}
                <i>
                  {fruit.date.toString().slice(0, 10) +
                    " @ " +
                    fruit.date.toString().slice(11, 19)}
                </i>
                ]
              </li>
            );
          })}
      </ul>

      <Button className="btn btn-danger" onClick={userDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default Profile;
