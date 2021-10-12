import React, { useEffect, useState } from "react";
import "./Profile.css";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import "./Profile.css";

import { useDispatch, useSelector } from "react-redux";
import {
  detailsUser,
  updateUserProfile,
  USER_UPDATE_PROFILE_RESET,
} from "../store/actions/user";
import { Fragment } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords don't match");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

  return (
    <div className="profile">
      <div>
        <h1>Profile</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Fragment>
            {loadingUpdate && <LoadingBox> </LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}
            <form className="profile-details" onSubmit={submitHandler}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  name="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="text"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="text"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your confirm password"
                />
              </div>
              <div>
                <label htmlFor=""></label>
                <button className="" type="submit">
                  Update
                </button>
              </div>
            </form>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Profile;
