import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { NavLink, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { CiSaveUp2 } from "react-icons/ci";
import { Card } from "antd";
import { toast } from "react-toastify";
import { useSavePostContext } from "../context/savePostContext";
import { useLikeAndDislikeContext } from "../context/likeAndDislikeContext";

const SavedPost = () => {
  const { auth } = useGlobalContext();
  const navigate = useNavigate();
  const [savedPostsFromStorage, setSavedPostsFromStorage] = useState([]);
  const [initialPost, setInitialPost] = useState(3);
  const [loadMore, setLoadMore] = useState(false);
  const [showPost, setShowPost] = useState([]);
  const { likePost, dislikePost, contextValue } = useLikeAndDislikeContext();
  const { savedPostIds, savePostFunction } = useSavePostContext();

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
        toast.success(dataFromResponse?.message);
        // Refresh saved posts after deletion
        const updatedSavedPosts = savedPostsFromStorage.filter(
          (post) => post._id !== id
        );
        setSavedPostsFromStorage(updatedSavedPosts);
        localStorage.setItem("savepost", JSON.stringify(updatedSavedPosts));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update the state when the component mounts
  useEffect(() => {
    let savedPost = localStorage.getItem("savepost");

    if (savedPost) {
      let data = JSON.parse(savedPost);
      setSavedPostsFromStorage(data);
    }
  }, [savedPostIds]);

  // Load more posts
  const handleLoadMore = () => {
    setInitialPost((prev) => prev + 3);
  };

  useEffect(() => {
    setShowPost(savedPostsFromStorage.slice(0, initialPost));
    setLoadMore(initialPost < savedPostsFromStorage.length);
  }, [savedPostsFromStorage, initialPost]);

  return (
    <>
      <div className="container mb-5">
        {showPost?.length === 0 && (
          <p className="text-danger text-center mt-5">No Posts Found</p>
        )}
        <div className="row">
          {showPost.map((ele, idx) => {
            const isPostSaved = savedPostIds.includes(ele._id);
            const isPostLiked = contextValue.likes[ele._id];
            const isPostDisliked = contextValue.dislikes[ele._id];
            return (
              <div className="col-md-4" key={idx}>
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
                      <b>Author</b>: {ele?.author?.name}
                    </p>
                    <p>
                      <b>Title</b>: {ele.title}
                    </p>
                    <p>
                      <b>Description</b>: {ele.des.slice(0, 25) + "..... "}
                    </p>
                  </Card>
                </NavLink>
                <div className="">
                  <div className="icons d-flex justify-content-between m-2 shadow p-3">
                    {auth?.user?._id === ele?.author?._id ? (
                      <>
                        <div className="">
                          <LikeOutlined
                            key="like"
                            className="icon"
                            onClick={() => likePost(ele._id)}
                            style={{
                              color: isPostLiked ? "red" : "black",
                            }}
                          />
                        </div>
                        <div className="">
                          <DislikeOutlined
                            key="dislike"
                            className="icon"
                            onClick={() => dislikePost(ele._id)}
                            style={{
                              color: isPostDisliked ? "red" : "black",
                            }}
                          />
                        </div>
                        <CiSaveUp2
                          key="save"
                          className="icon"
                          size={20}
                          onClick={() => savePostFunction(ele)}
                          style={{
                            color: isPostSaved ? "red" : "black",
                            cursor: "pointer",
                          }}
                        />
                        <div className="">
                          <EditOutlined
                            key="edit"
                            className="icon"
                            onClick={() => handleEdit(ele?._id)}
                          />
                        </div>
                        <div className="">
                          <DeleteOutlined
                            className="icon"
                            key="delete"
                            onClick={() => handleDelete(ele?._id)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="">
                          <LikeOutlined
                            key="like"
                            className="icon"
                            onClick={() => likePost(ele._id)}
                            style={{
                              color: isPostLiked ? "red" : "black",
                            }}
                          />
                        </div>
                        <div className="">
                          <DislikeOutlined
                            key="dislike"
                            className="icon"
                            onClick={() => dislikePost(ele._id)}
                            style={{
                              color: isPostDisliked ? "red" : "black",
                            }}
                          />
                        </div>
                        <CiSaveUp2
                          key="save"
                          className="icon"
                          size={20}
                          onClick={() => savePostFunction(ele)}
                          style={{
                            color: isPostSaved ? "red" : "black",
                            cursor: "pointer",
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mb-5">
        {loadMore && (
          <>
            <button className="btn btn-warning" onClick={handleLoadMore}>
              Load More
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SavedPost;
