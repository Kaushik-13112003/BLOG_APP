const postModel = require("../models/postModel");
const fs = require("fs");

//create post
const createPostController = async (req, res) => {
  try {
    let { title, des, category, author, extra } = req.fields;

    let { photo } = req.files;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    if (!des) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!photo) {
      return res.status(400).json({ message: "photo is required" });
    }

    //create new post
    const newPost = new postModel({
      title,
      des,
      category,
      authorName: req.user?.name,
      author: req.user?._id,
      extra,
    });

    if (photo) {
      newPost.photo.data = fs.readFileSync(photo.path);
      newPost.photo.contentType = photo.type;
    }

    // Ensure photos is an array
    //  const photosArray = Array.isArray(photos) ? photos : [photos];

    //   for (const photo of photosArray) {
    //     newPost.photo.push({
    //       data: fs.readFileSync(photo.path),
    //       contentType: photo.type,
    //     });
    //   }
    // if (photo) {
    //   if (Array.isArray(photo)) {
    //     for (let i = 0; i < photo.length; i++) {
    //       newPost.photo.push({
    //         data: fs.readFileSync(photo[i].path),
    //         contentType: photo[i].type,
    //       });
    //     }
    //   } else {
    //     newPost.photo.push({
    //       data: fs.readFileSync(photo.path),
    //       contentType: photo.type,
    //     });
    //   }
    // }

    await newPost.save();
    return res.status(200).json({ message: "Post Created", newPost: newPost });
  } catch (err) {
    console.log(err);
  }
};

//update post
const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { photo } = req.files;

    const updatePost = await postModel.findByIdAndUpdate(
      { _id: id },
      {
        ...req.fields,
      },
      { new: true }
    );

    if (photo) {
      updatePost.photo.data = fs.readFileSync(photo.path);
      updatePost.photo.contentType = photo.type;
    }

    await updatePost.save();
    return res
      .status(200)
      .json({ message: "Post Updated", updatePost: updatePost });
  } catch (err) {
    console.log(err);
  }
};

//get single post
const getSinglePostController = async (req, res) => {
  try {
    let { id } = req.params;

    const singlePost = await postModel
      .findById(id)
      .select("-photo")
      .populate("author");

    if (singlePost) {
      return res.status(200).json({ singlePost: singlePost });
    } else {
      return res.status(400).json({ message: "Post Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get all posts
const getAllPostController = async (req, res) => {
  try {
    const findPosts = await postModel
      .find()
      .select("-photo")
      .populate("author", ["name"])
      .sort({ createdAt: -1 });

    if (findPosts) {
      return res
        .status(200)
        .json({ length: findPosts.length, findPosts: findPosts });
    } else {
      return res.status(400).json({ message: "Posts Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get all posts
const getUsersAllPostController = async (req, res) => {
  try {
    const { id } = req.params;
    const findPosts = await postModel
      .find({ author: id })
      .select("-photo")
      .populate("author");

    if (findPosts) {
      return res
        .status(200)
        .json({ length: findPosts.length, findPosts: findPosts });
    } else {
      return res.status(400).json({ message: "Posts Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//deletePost
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePost = await postModel.findByIdAndDelete({ _id: id });

    if (deletePost) {
      return res.status(200).json({ message: "Post Deleted" });
    }
  } catch (err) {
    console.log(err);
  }
};

//get post images
const getPostImagesController = async (req, res) => {
  try {
    const { id } = req.params;

    const findPhoto = await postModel
      .findOne({ _id: id })
      .select("photo")
      .populate("author");
    if (findPhoto.photo.data) {
      return res.status(200).send(findPhoto.photo.data);
    } else {
      return res.status(400).json({ message: "Post Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
};

//search Post
const searchPostController = async (req, res) => {
  try {
    const { keyword } = req.params;

    const searchPost = await postModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { authorName: { $regex: keyword, $options: "i" } },
          { des: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo")
      .populate("author");

    return res.status(200).json({ searchPost: searchPost });
  } catch (err) {
    console.log(err);
  }
};

//search Post
const similarPostController = async (req, res) => {
  try {
    const { id } = req.params;

    const similiarPosts = await postModel.find({ author: id });
    if (similiarPosts) {
      return res.status(200).json({ similiarPosts: similiarPosts });
    } else {
      return res.status(400).json({ message: "No Similiar Posts" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPostController,
  updatePostController,
  getAllPostController,
  getSinglePostController,
  deletePostController,
  getPostImagesController,
  getUsersAllPostController,
  searchPostController,
  similarPostController,
};
