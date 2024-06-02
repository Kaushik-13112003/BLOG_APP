import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";

const Login = () => {
  const { auth, setAuth } = useGlobalContext();
  const navigate = useNavigate("");
  const location = useLocation("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      const dataFromResponse = await res.json();
      // console.log(dataFromResponse);
      if (res.ok) {
        toast.success(dataFromResponse?.message);

        setAuth({
          ...auth,
          user: dataFromResponse?.loginData,
          token: dataFromResponse?.token,
        });

        localStorage.setItem("blog", JSON.stringify(dataFromResponse));
        navigate("/");
      } else {
        toast.error(dataFromResponse.message);
      }
      setPassword("");
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container login loginregister ">
        <h3 className="text-center">Login </h3>

        <form method="post">
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
            Not Registered ? <NavLink to="/register">Register</NavLink>
          </p>
          {/* <p className="mt-3">
            Forgot Password ?{" "}
            <NavLink to="/forgot-password"> Reset Password</NavLink>
          </p> */}
        </form>
      </div>
    </>
  );
};

export default Login;
