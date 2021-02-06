import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./AuthStyle.css"

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name: user.name,
        password: user.password,
      };

      const loginResponse = await axios.post("/api/users/login", newUser);
      //console.log(loginResponse.data)
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      setUser({
        name: "",
        password: "",
      });

      window.location = "/";
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg("We have an error!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((oldUser) => {
      return {
        ...oldUser,
        [name]: value,
      };
    });
  };

  return (
    <div className="LoginComponent">
      <form className="LoginForm" onSubmit={handleSubmit}>
        <label>Username:</label>
        <br />
        <input type="text" name="name" value={user.name}
          required onChange={handleChange} />
        <br />
        <label>Password:</label>
        <br />
        <input type="password" name="password" value={user.password}
          onChange={handleChange} />
        <br />
        <Button className="LoginBtn" variant="success" type="submit">
          Log In
        </Button>
      </form>
      {errorMsg && <ErrorMsg msg={errorMsg} />}
    </div>
  );
};

export default Login;
