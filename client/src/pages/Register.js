import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/actions/user";
import { useLocation, useHistory } from "react-router-dom";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
    history.push("/signin");
  };

  // useEffect(() => {
  //   if (userInfo) {
  //     props.history.push("/signin");
  //   }
  // }, [userInfo, redirect, props.history]);

  return (
    <form className="register-form" onSubmit={submitHandler}>
      <div>
        <h1>Register</h1>
      </div>
      <div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger"> {error} </MessageBox>}
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
      <div className="new-account-link">
        <span>Already has an account? </span> <Link to="/signin">Login</Link>
      </div>
    </form>
  );
};

export default Register;
