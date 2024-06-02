import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavePostContext = createContext();

const SavePostProvider = ({ children }) => {
  const [savePost, setSavePost] = useState([]);
  const [savedPostIds, setSavedPostIds] = useState([]);

  useEffect(() => {
    // Retrieve saved post IDs from local storage
    if (localStorage.getItem("savedPostIds")) {
      const savedPostIdsFromLocalStorage =
        JSON.parse(localStorage.getItem("savedPostIds")) || [];
      setSavedPostIds(savedPostIdsFromLocalStorage);
    }
  }, []);

  const savePostFunction = async (post) => {
    try {
      const postId = post._id;
      const isSaved = savedPostIds.includes(postId);

      if (!isSaved) {
        // Save the post
        setSavePost([...savePost, post]);
        setSavedPostIds([...savedPostIds, postId]);
        localStorage.setItem("savepost", JSON.stringify([...savePost, post]));
        localStorage.setItem(
          "savedPostIds",
          JSON.stringify([...savedPostIds, postId])
        );
      } else {
        // Unsave the post
        const filteredSavedPosts = savePost.filter(
          (savedPost) => savedPost._id !== postId
        );
        setSavePost(filteredSavedPosts);
        const filteredSavedPostIds = savedPostIds.filter(
          (savedPostId) => savedPostId !== postId
        );
        setSavedPostIds(filteredSavedPostIds);
        localStorage.setItem("savepost", JSON.stringify(filteredSavedPosts));
        localStorage.setItem(
          "savedPostIds",
          JSON.stringify(filteredSavedPostIds)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SavePostContext.Provider
      value={{ savePost, setSavePost, savePostFunction, savedPostIds }}
    >
      {children}
    </SavePostContext.Provider>
  );
};

const useSavePostContext = () => {
  return useContext(SavePostContext);
};

export { SavePostProvider, useSavePostContext };
