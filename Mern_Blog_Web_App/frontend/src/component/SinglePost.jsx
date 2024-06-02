import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import moment from "moment";
import SimilarPosts from "./SimilarPosts";
import { useLikeAndDislikeContext } from "../context/likeAndDislikeContext";
import { CiSaveUp2 } from "react-icons/ci";
import { useSavePostContext } from "../context/savePostContext";

const SinglePost = () => {
  const navigate = useNavigate("");
  const [singlePost, setSinglePost] = useState("");
  const { id } = useParams();
  const { auth } = useGlobalContext();
  // console.log(auth);
  const { likePost, dislikePost, contextValue } = useLikeAndDislikeContext();
  const { savedPostIds, savePostFunction } = useSavePostContext();

  const isPostSaved = savedPostIds.includes(singlePost?._id);
  const isPostLiked = contextValue.likes[singlePost?._id];
  const isPostDisliked = contextValue.dislikes[singlePost?._id];

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
        setSinglePost(dataFromResponse?.singlePost);
        // console.log(singlePost);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSinglePost();
  }, [id, navigate]);
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-5">
            {" "}
            <NavLink
              to={`/single-post/${singlePost?._id}`}
              className={"nav-link"}
            >
              {/* <PostCart ele={singlePost} /> */}
              {
                <Card
                  className="shadow mt-5 mb-5"
                  hoverable
                  cover={
                    <img
                      style={{ height: 300 }}
                      alt="example"
                      src={`${import.meta.env.VITE_BACKEND_URL}/post-photo/${
                        singlePost?._id
                      }`}
                    />
                  }
                ></Card>
              }
            </NavLink>
          </div>
          <div className="col-md-5 ml-4 mt-5 mb-5">
            <p>
              <NavLink className={"nav-link"}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/user-photo/${
                    singlePost?.author?._id
                  }`}
                  alt={singlePost?.author?.name}
                  style={{ width: "100px", marginLeft: "-17px" }}
                />
              </NavLink>
              Created By : <code>{singlePost?.author?.name}</code>
            </p>
            <p>
              {" "}
              Created At :{" "}
              <code>{moment(singlePost?.createdAt).fromNow()}</code>
            </p>
            <p>
              Category : <code> {singlePost?.category}</code>{" "}
            </p>
            <div className="">
              <div
                className="icons d-flex justify-content-between"
                style={{ width: "170px" }}
              >
                {" "}
                <div className="">
                  <LikeOutlined
                    key="like"
                    className="icon"
                    onClick={() => likePost(singlePost?._id)}
                    style={{
                      color: isPostLiked ? "red" : "black",
                    }}
                  />
                </div>
                <div className="">
                  <DislikeOutlined
                    key="dislike"
                    className="icon"
                    onClick={() => dislikePost(singlePost?._id)}
                    style={{
                      color: isPostDisliked ? "red" : "black",
                    }}
                  />
                </div>
                <CiSaveUp2
                  key="save"
                  className="icon"
                  size={20}
                  onClick={() => savePostFunction(singlePost)}
                  style={{
                    color: isPostSaved ? "red" : "black",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h4>
            Title : <code>{singlePost?.title}</code>
          </h4>
          <p style={{ textAlign: "justify" }}>
            Description : {singlePost?.des}
          </p>
          {singlePost?.extra && (
            <>
              <span
                dangerouslySetInnerHTML={{ __html: singlePost?.extra }}
              ></span>
            </>
          )}
        </div>
        <SimilarPosts sameEle={singlePost} author={singlePost?.author?._id} />
      </div>
    </>
  );
};

export default SinglePost;
