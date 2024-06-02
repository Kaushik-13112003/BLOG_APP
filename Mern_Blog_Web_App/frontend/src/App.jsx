import React from "react";
import { Route, Routes } from "react-router-dom";
import Private from "./Private/Private";
import AllPost from "./component/AllPost";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import MyPosts from "./component/MyPosts";
import ForgotPassword from "./component/ForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Search from "antd/es/input/Search";
import ResetPassword from "./component/ResetPassword";
import UpdatePost from "./component/UpdatePost";
import UpdateProfile from "./component/UpdateProfile";
import CreatePost from "./component/CreatePost";
import SavedPost from "./component/SavedPost";
import SinglePost from "./component/SinglePost";
import SimilarPosts from "./component/SimilarPosts";
import SearchResult from "./component/SearchResult";
import Profile from "./component/Profile";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />

      <Routes>
        <Route path="/" element={<Private />}>
          <Route path="/" element={<AllPost />}></Route>
          <Route path="/all-posts" element={<AllPost />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/my-posts" element={<MyPosts />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/saved-post" element={<SavedPost />}></Route>
          <Route path="/search-result" element={<SearchResult />}></Route>
          <Route path="/update-post/:id" element={<UpdatePost />}></Route>
          <Route path="/update-profile/:id" element={<UpdateProfile />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/single-post/:id" element={<SinglePost />}></Route>
          <Route
            path="/similiar-post/:author"
            element={<SimilarPosts />}
          ></Route>
          <Route path="/update-profile/:id" element={<UpdateProfile />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </>
  );
};

export default App;
