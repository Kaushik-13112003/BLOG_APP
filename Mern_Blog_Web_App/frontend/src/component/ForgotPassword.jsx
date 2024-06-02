import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/context";

const ForgotPassword = () => {
  const navigate = useNavigate("");

  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/forgot-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email }),
        }
      );

      const dataFromResponse = await res.json();
      // console.log(dataFromResponse);
      if (res.ok) {
        toast.success(dataFromResponse?.message);

        navigate("/reset-password");
      } else {
        toast.error(dataFromResponse.message);
      }
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container login loginregister ">
        <h3 className="text-center mb-3">Reset Password </h3>

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

export default ForgotPassword;
