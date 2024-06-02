import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";
import { NavLink } from "react-router-dom";

const Register = () => {
  const { auth, setAuth } = useGlobalContext();

  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // console.log(photo);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log({ ...data });
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("photo", photo);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",

        body: formData,
      });

      const dataFromResponse = await res.json();
      if (res.ok) {
        toast.success(dataFromResponse.message);

        navigate("/login");
      } else {
        toast.error(dataFromResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container register loginregister">
        <h3 className="text-center mt-5">Register Now</h3>
        <form method="post mb-5">
          <div className="form-group mt-4">
            <label
              id="photo"
              className="btn btn-info"
              style={{ width: "100%" }}
            >
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                className="form-control"
                id="photo"
                except="/Images/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>

            <div className="text-center mt-3">
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt=""
                  style={{ width: "200px", borderRadius: "20px" }}
                />
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="xyz..."
            />
          </div>

          <button className="btn btn-warning mt-2" onClick={handleSubmit}>
            Submit
          </button>

          <p className="mt-3">
            Already Registered ? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
