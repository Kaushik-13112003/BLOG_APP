import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGlobalContext } from "../context/context";

const UpdatePost = () => {
  const { id } = useParams();
  const { auth } = useGlobalContext();
  const navigate = useNavigate("");
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [category, setCategory] = useState("");
  const [extra, setExtra] = useState("");
  const [photo, setPhotos] = useState("");

  // console.log(auth);

  const getSinglePost = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/single-post/${id}`,
        {
          method: "GET",
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setTitle(dataFromResponse?.singlePost?.title);
        setDes(dataFromResponse?.singlePost?.des);
        setExtra(dataFromResponse?.singlePost?.extra);
        setCategory(dataFromResponse?.singlePost?.category);
        // console.log(singlePost);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get single post
  useEffect(() => {
    getSinglePost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("des", des);
      formData.append("category", category);
      // photos.forEach((photo) => formData.append("photos", photo));

      photo && formData.append("photo", photo);
      formData.append("extra", extra);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-post/${id}`,
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
        navigate("/my-posts");
        // window.location.reload();
      } else {
        toast.error(dataFromResponse.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //reqct-quill

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <h3 className="text-center">Update Post</h3>
        <form method="post">
          <div className="form-group mt-4">
            <label className="btn btn-info" style={{ width: "100%" }}>
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setPhotos(e.target.files[0])}
                hidden
              />
            </label>

            <div className="text-center mt-3">
              {!photo ? (
                <>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/post-photo/${id}`}
                    alt=""
                    style={{ width: "280px", borderRadius: "10px" }}
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="first blog"
            />
          </div>

          <div className="form-group">
            <label htmlFor="des">Description</label>
            <input
              type="text"
              className="form-control"
              id="des"
              name="des"
              value={des}
              onChange={(e) => setDes(e.target.value)}
              placeholder="It's Awesome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex:Sport"
            />
          </div>

          <ReactQuill
            value={extra}
            onChange={(newValue) => setExtra(newValue)}
            modules={modules}
            formats={formats}
          />

          <button className="btn btn-warning mt-4" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
