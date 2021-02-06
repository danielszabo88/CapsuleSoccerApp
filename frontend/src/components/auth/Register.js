import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import ErrorMsg from "./ErrorMsg";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./AuthStyle.css"

const Register = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [user, setUser] = useState({
    name: "",
    password: "",
    passwordAgain: "",
  });
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        name: user.name,
        password: user.password,
      };

      if (user.password !== user.passwordAgain) {
        setErrorMsg("Enter the same password twice!");
        return;
      } else {
        console.log(newUser);
      }
      await axios.post("/api/users/register", newUser);

      const loginResponse = await axios.post("/api/users/login", newUser);
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });
      localStorage.setItem("auth-token", loginResponse.data.token);

      setUser({
        name: "",
        password: "",
        passwordAgain: "",
      });

      window.location = "/";
    } catch (err) {
      err.response.data.msg
        ? setErrorMsg(err.response.data.msg)
        : setErrorMsg("We have some error!");
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
    <div className="RegisterComponent">
      <form className="RegisterForm" onSubmit={handleSubmit}>
        <label>Username:&nbsp; </label>
        <input type="text" name="name" value={user.name}
          required onChange={handleChange} />
        <br />
        <label>Password:&nbsp; </label>
        <input type="password" name="password"  value={user.password}
          onChange={handleChange} />
        <br />
        <label>Password Again:&nbsp; </label>
        <input type="password" name="passwordAgain" value={user.passwordAgain}
          onChange={handleChange} />
        <br />
        <Button className="RegisterBtn" variant="success" type="submit">Reg!</Button>
      </form>
      {errorMsg && <ErrorMsg msg={errorMsg} />}
    </div>
  );
};

export default Register;
