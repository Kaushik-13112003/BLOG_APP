import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate("");

  useEffect(() => {
    let time = setInterval(() => {
      navigate("/login");
    }, 1000);

    return () => clearInterval(time);
  }, []);
  return (
    <>
      <div
        className="text-center d-flex justify-content-center align-items-center "
        style={{ height: "80vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
