import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const LikeAndDislikeContext = createContext();

const LikeAndDislikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [totalLikes, setTotalLikes] = useState({});
  const [totalDislikes, setTotalDislikes] = useState({});

  useEffect(() => {
    let storedLikes = localStorage.getItem("likes");
    let storedDislikes = localStorage.getItem("dislikes");
    let storedTotalLikes = localStorage.getItem("totalLikes");
    let storedTotalDislikes = localStorage.getItem("totalDislikes");
    if (storedLikes) {
      storedLikes = JSON.parse(localStorage.getItem("likes")) || {};

      setLikes(storedLikes);
    }

    if (storedDislikes) {
      storedDislikes = JSON.parse(localStorage.getItem("dislikes")) || {};
      setDislikes(storedDislikes);
    }

    if (storedTotalDislikes) {
      storedTotalDislikes =
        JSON.parse(localStorage.getItem("totalDislikes")) || {};

      setTotalDislikes(storedTotalDislikes);
    }

    if (storedTotalLikes) {
      storedTotalLikes = JSON.parse(localStorage.getItem("totalLikes")) || {};

      setTotalLikes(storedTotalLikes);
    }
  }, []);

  const likePost = (postId) => {
    const updatedLikes = { ...likes, [postId]: true };
    const updatedDislikes = { ...dislikes, [postId]: false };
    const updatedTotalLikes = {
      ...totalLikes,
      [postId]: (totalLikes[postId] || 0) + 1,
    };
    const updatedTotalDislikes = {
      ...totalDislikes,
      [postId]: totalDislikes[postId] || 0,
    };
    setLikes(updatedLikes);
    setDislikes(updatedDislikes);
    setTotalLikes(updatedTotalLikes);
    setTotalDislikes(updatedTotalDislikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
    localStorage.setItem("totalLikes", JSON.stringify(updatedTotalLikes));
    localStorage.setItem("totalDislikes", JSON.stringify(updatedTotalDislikes));
  };

  const dislikePost = (postId) => {
    const updatedLikes = { ...likes, [postId]: false };
    const updatedDislikes = { ...dislikes, [postId]: true };
    const updatedTotalLikes = {
      ...totalLikes,
      [postId]: totalLikes[postId] || 0,
    };
    const updatedTotalDislikes = {
      ...totalDislikes,
      [postId]: (totalDislikes[postId] || 0) + 1,
    };
    setLikes(updatedLikes);
    setDislikes(updatedDislikes);
    setTotalLikes(updatedTotalLikes);
    setTotalDislikes(updatedTotalDislikes);
    localStorage.setItem("likes", JSON.stringify(updatedLikes));
    localStorage.setItem("dislikes", JSON.stringify(updatedDislikes));
    localStorage.setItem("totalLikes", JSON.stringify(updatedTotalLikes));
    localStorage.setItem("totalDislikes", JSON.stringify(updatedTotalDislikes));
  };

  const contextValue = {
    likes,
    dislikes,
    totalLikes,
    totalDislikes,
  };

  return (
    <LikeAndDislikeContext.Provider
      value={{ contextValue, likePost, dislikePost }}
    >
      {children}
    </LikeAndDislikeContext.Provider>
  );
};

const useLikeAndDislikeContext = () => {
  return useContext(LikeAndDislikeContext);
};

export { LikeAndDislikeProvider, useLikeAndDislikeContext };
