import React, { useEffect, useState } from "react";
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
import { useGlobalContext } from "../context/context";
import { useSearchContext } from "../context/searchContext";

const SearchResult = () => {
  const navigate = useNavigate("");
  const [searchdata, setShowPost] = useState([]);
  const { likePost, dislikePost, contextValue } = useLikeAndDislikeContext();
  const { savedPostIds } = useSavePostContext();
  const { auth } = useGlobalContext();

  const { search } = useSearchContext();

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
        navigate("/my-posts");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //update
  const handleEdit = (id) => {
    navigate(`/update-post/${id}`);
  };

  return (
    <>
      <div className="container mb-5">
        {search.data?.length === 0 && (
          <p className="text-danger text-center mt-5">No Posts Found</p>
        )}
        <div className="row">
          {search.data.map((ele, idx) => {
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
                    {" "}
                    <p>
                      <b>Author</b> : {ele?.author?.name}
                    </p>
                    <p>
                      <b>Title</b> : {ele.title}
                    </p>
                    <p>
                      <b>Description</b> : {ele.des.slice(0, 25) + ".....  "}
                    </p>
                  </Card>
                </NavLink>
                <div className="">
                  <div
                    className="icons d-flex justify-content-between m-2 shadow p-3"
                    // style={{ width: "130px" }}
                  >
                    {auth?.user?._id === ele?.author?._id ? (
                      <>
                        <LikeOutlined
                          key="like"
                          className="icon"
                          onClick={() => likePost(ele._id)}
                          style={{
                            color: contextValue.likes[ele._id]
                              ? "red"
                              : "black",
                          }}
                        />
                        <DislikeOutlined
                          key="dislike"
                          className="icon"
                          onClick={() => dislikePost(ele._id)}
                          style={{
                            color: contextValue.dislikes[ele._id]
                              ? "red"
                              : "black",
                          }}
                        />

                        <EditOutlined
                          key="edit"
                          className="icon"
                          onClick={() => handleEdit(ele._id)}
                        />
                       
                      </>
                    ) : (
                      <>
                        {" "}
                        <LikeOutlined
                          key="like"
                          className="icon"
                          onClick={() => likePost(ele._id)}
                          style={{
                            color: contextValue.likes[ele._id]
                              ? "red"
                              : "black",
                          }}
                        />
                        <DislikeOutlined
                          key="dislike"
                          className="icon"
                          onClick={() => dislikePost(ele._id)}
                          style={{
                            color: contextValue.dislikes[ele._id]
                              ? "red"
                              : "black",
                          }}
                        />
                      </>
                    )}
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

export default SearchResult;
