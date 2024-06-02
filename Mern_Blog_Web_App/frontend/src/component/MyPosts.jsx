import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { NavLink, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import { toast } from "react-toastify";

import { CiSaveUp2 } from "react-icons/ci";
import { useSavePostContext } from "../context/savePostContext";
import { useLikeAndDislikeContext } from "../context/likeAndDislikeContext";

const MyPosts = () => {
  const { auth } = useGlobalContext();
  const navigate = useNavigate("");
  const [allPost, setAllPost] = useState([]);
  const { savedPostIds, savePostFunction } = useSavePostContext();
  const { likePost, dislikePost, contextValue } = useLikeAndDislikeContext();

  const getAllPost = async () => {
    try {
      let res = await fetch(
        `http://localhost:5000/user-all-post/${auth?.user?._id}`,
        {
          method: "GET",
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setAllPost(dataFromResponse?.findPosts);
        // console.log(allPost);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/delete-post/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: auth?.token,
          },
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setAllPost(dataFromResponse?.message);
        toast.success(dataFromResponse?.message);
        window.location.reload(); // Refresh the page after successful deletion
      }
    } catch (err) {
      console.log(err);
    }
  };

  //update
  const handleEdit = (id) => {
    navigate(`/update-post/${id}`);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <>
      <div className="container mb-5">
        {allPost?.length === 0 && (
          <p
            className="text-center  text-danger"
            style={{ marginTop: "100px" }}
          >
            No Posts Found{" "}
            <span
              onClick={() => navigate("/create-post")}
              className="btn btn-info"
            >
              Create Post
            </span>
          </p>
        )}
        <div className="row">
          {allPost.map((ele, idx) => {
            const isPostSaved = savedPostIds.includes(ele._id);

            return (
              <div className="col-md-4" key={idx}>
                {" "}
                <NavLink to={`/single-post/${ele._id}`} className={"nav-link"}>
                  <Card
                    className="shadow mt-5 mb-5"
                    hoverable
                    cover={
                      <img
                        style={{ height: 300 }}
                        alt="example"
                        src={`${import.meta.env.VITE_BACKEND_URL}/post-photo/${
                          ele._id
                        }`}
                      />
                    }
                  >
                    <p>
                      <b>Title</b> : {ele.title}
                    </p>
                    <p>
                      <b>Description</b> : {ele.des.slice(0, 25) + ".....  "}
                    </p>
                  </Card>{" "}
                </NavLink>
                <div className="">
                  <div
                    className="icons d-flex justify-content-between m-2 shadow p-3"
                    // style={{ width: "130px" }}
                  >
                    {" "}
                    <LikeOutlined
                      key="like"
                      className="icon"
                      onClick={() => likePost(ele._id)}
                      style={{
                        color: contextValue.likes[ele._id] ? "red" : "black",
                      }}
                    />
                    <DislikeOutlined
                      key="dislike"
                      className="icon"
                      onClick={() => dislikePost(ele._id)}
                      style={{
                        color: contextValue.dislikes[ele._id] ? "red" : "black",
                      }}
                    />
                    <EditOutlined
                      key="edit"
                      className="icon"
                      onClick={() => handleEdit(ele._id)}
                    />
                    <DeleteOutlined
                      className="icon"
                      key="delete"
                      onClick={() => handleDelete(ele._id)}
                    />
                  </div>
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
