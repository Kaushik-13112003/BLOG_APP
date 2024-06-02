import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { CiSaveUp2 } from "react-icons/ci";
// import { useSavePostContext } from "../context/saveContext";
import { Card } from "antd";
import { useSavePostContext } from "../context/savePostContext";

const SimilarPosts = ({ sameEle, author = "" }) => {
  const [similiar, setSimiliar] = useState([]);
  const { savedPostIds, savePostFunction } = useSavePostContext();

  const getSimiliarPosts = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/similiar-post/${author}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();
      // console.log(dataFromResponse?.similiarPosts);

      if (res.ok) {
        let filter = dataFromResponse?.similiarPosts.filter((e, idx) => {
          return sameEle._id !== e._id;
        });
        setSimiliar(filter);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSimiliarPosts();
  }, [author, sameEle]);

  return (
    <>
      <div className="">
        <hr />
        <div className="container mb-5">
          {similiar?.length === 0 && (
            <p className="text-danger text-center">No similar posts found</p>
          )}
          <div className="row">
            {similiar.map((ele, idx) => {
              // <p className="text-info">You might also like : </p>;
              const isPostSaved = savedPostIds.includes(ele._id);

              return (
                <div className="col-md-4" key={idx}>
                  <NavLink
                    to={`/single-post/${ele._id}`}
                    className={"nav-link"}
                  >
                    <Card
                      className="shadow mt-5"
                      hoverable
                      cover={
                        <img
                          style={{ height: 300 }}
                          alt="example"
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/post-photo/${ele._id}`}
                        />
                      }
                    >
                      <p>
                        <b>Author</b> : {sameEle?.author?.name}
                      </p>
                      <p>
                        <b>Title</b> : {ele.title}
                      </p>
                      <p>
                        <b>Description</b> : {ele.des.slice(0, 25) + ".....  "}
                      </p>
                    </Card>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarPosts;
