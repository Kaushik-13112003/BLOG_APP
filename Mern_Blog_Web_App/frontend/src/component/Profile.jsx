import React from "react";
import { useGlobalContext } from "../context/context";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { auth } = useGlobalContext();

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row profile">
          <div className="">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/user-photo/${
                auth?.user?._id
              }`}
              alt=""
              style={{ width: "200px", borderRadius: "100px" }}
            />
          </div>
          <div className="">
            <p>Name : {auth?.user?.name}</p>
            <p>Email : {auth?.user?.email}</p>
            <p style={{ marginLeft: "-15px" }}>
              <NavLink
                className={"nav-link"}
                to={`/update-profile/${auth?.user?._id}`}
              >
                <button className="btn btn-info">Update Profile</button>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
