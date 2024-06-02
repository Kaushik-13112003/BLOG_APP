import React, { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";

const UpdateProfile = () => {
  const { auth, setAuth } = useGlobalContext();

  const { id } = useParams();
  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-user/${id}`,
        {
          method: "PUT",

          headers: {
            Authorization: auth?.token,
          },

          body: formData,
        }
      );

      const dataFromResponse = await res.json();
      if (res.ok) {
        toast.success(dataFromResponse.message);

        localStorage.setItem(
          "blog",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("blog")),
            loginData: dataFromResponse?.loginData,
          })
        );
        setAuth({
          ...auth,
          user: dataFromResponse?.loginData,
        });

        navigate("/profile");
        window.location.reload();
      } else {
        toast.error(dataFromResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get user
  const getSingleUser = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/single-user/${id}`,
        {
          method: "GET",
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setName(dataFromResponse?.findUser?.name);
        setEmail(dataFromResponse?.findUser?.email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [id]);
  return (
    <>
      <div className="container  mt-5 mb-5 ">
        <h3 className="text-center">Update Profile</h3>
        <form method="post">
          <div className="form-group mt-4">
            <label
              id="photo"
              className="btn btn-info"
              style={{ width: "100%" }}
            >
              {photo ? photo.name : "Upload New Photo"}
              <input
                type="file"
                className="form-control"
                id="photo"
                accept="images/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>

            <div className="text-center mt-3">
              {!photo ? (
                <>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/user-photo/${id}`}
                    alt=""
                    style={{ width: "200px", borderRadius: "10px" }}
                  />
                </>
              ) : (
                <>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt=""
                    style={{ width: "280px", borderRadius: "10px" }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="john"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <button className="btn btn-warning mt-2" onClick={handleSubmit}>
            Submit
          </button>

          <p className="mt-3">
            Go Back ? <NavLink to="/profile">Profile</NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
