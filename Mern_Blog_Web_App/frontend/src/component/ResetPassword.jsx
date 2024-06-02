import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";

const ResetPassword = () => {
  const { auth, setAuth } = useGlobalContext();
  const navigate = useNavigate("");
  const location = useLocation("");

  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email, newPassword, otp }),
        }
      );

      const dataFromResponse = await res.json();
      // console.log(dataFromResponse);
      if (res.ok) {
        toast.success(dataFromResponse?.message);

        navigate("/login");
      } else {
        toast.error(dataFromResponse.message);
      }
      setPassword("");
      setEmail("");
      setOtp("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container login loginregister ">
        <h3 className="text-center">Update Password </h3>

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
            <label htmlFor="otp">Otp</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="text"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="xyz..."
            />
          </div>

          <button className="btn btn-warning mt-2" onClick={handleSubmit}>
            Submit
          </button>

          <p className="mt-3">
            Go Back ? <NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
