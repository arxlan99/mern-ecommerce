import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Signin.css";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../store/actions/user";
import { useLocation, useHistory } from "react-router-dom";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo, redirect, props.history]);

  return (
    <form className="signin-form" onSubmit={submitHandler}>
      <div>
        <h1>Sign In</h1>
      </div>
      <div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger"> {error} </MessageBox>}
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
        <span>Create an account? </span> <Link to="/register">Sign Up</Link>
      </div>
    </form>
  );
};

export default Signin;
