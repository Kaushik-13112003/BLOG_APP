import React, { useEffect, useState } from "react";
import { FaBars, FaBloggerB, FaCross } from "react-icons/fa";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";
import { CiSaveUp2 } from "react-icons/ci";
import { useSearchContext } from "../context/searchContext";
import { CloseOutlined } from "@ant-design/icons";
function Navbar() {
  const { auth, setAuth } = useGlobalContext();
  const { search, setSearch } = useSearchContext();
  const navigate = useNavigate("");

  const [isNavOpen, setIsNavOpen] = useState(false); // State to track whether navbar is open or closed

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle navbar state
  };

  // Close navbar when a route link is clicked
  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  //logout
  const handleLogout = async () => {
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("blog");
    } catch (err) {
      console.log(err);
    }
  };

  //search
  const handleSearch = async (event) => {
    event.preventDefault();
    if (search.keyword === "") {
      toast.error("Enter something to search");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:5000/search/${search.keyword}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setSearch({
          ...search,
          data: dataFromResponse?.searchPost,
          keyword: "",
        });

        navigate("/search-result");
      } else {
        toast.error(dataFromResponse?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow navbar-primary p-2 ">
        <img src="" alt="" className="navLogo" />
        <a
          className="pl-2 navbar-brand font-weight-bold text-primary mr-auto"
          href="/"
        >
          <FaBloggerB size={40} />
          logger
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav} // Toggle navbar when the icon is clicked
        >
          {/* Change the navbar toggle icon here */}
          <span className="navbar-toggler-icon">
            {isNavOpen ? <CloseOutlined /> : <FaBars size={20} />}
          </span>
        </button>

        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto text-center">
            <>
              {auth?.user && auth?.token ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/all-posts"
                      onClick={handleLinkClick}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/create-post"
                      onClick={handleLinkClick}
                    >
                      Create Post
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/my-posts"
                      onClick={handleLinkClick}
                    >
                      My Posts
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/profile"
                      onClick={handleLinkClick}
                    >
                      Profile
                    </NavLink>
                  </li>

                  <li className="nav-item" onClick={handleLogout}>
                    <NavLink
                      className="nav-link text-primary"
                      to="/login"
                      onClick={handleLinkClick}
                    >
                      Logout
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/saved-post"
                      onClick={handleLinkClick}
                    >
                      Saved
                    </NavLink>
                  </li>

                  <form className="form-inline my-2 my-lg-0">
                    <input
                      className="form-control mr-sm-2"
                      value={search.keyword}
                      onChange={(e) =>
                        setSearch({ ...search, keyword: e.target.value })
                      }
                      placeholder="Search Post"
                    />
                    <button
                      className="btn btn-info my-2 my-sm-0"
                      type="submit"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/login"
                      onClick={handleLinkClick}
                    >
                      Login
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-primary"
                      to="/register"
                      onClick={handleLinkClick}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
