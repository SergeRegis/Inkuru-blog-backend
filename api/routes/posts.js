const router = require("express").Router();
const { response } = require("express");
const Post = require("../model/post");

// create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//  update post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post Has been delete!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//  get post
router.get('/:id', async(req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post); 
  } catch (error) {
    res.status(404).json(error)
  }
});

//  get all post
router.get('/', async(req, res) => {
  const username = req.query.user
  const catName = req.query.cat

  try {
    let posts
    if(username) {
      posts = await Post.find({ username: username})
    } else if(catName) {


    }
  } catch (error) {

  }
}),



module.exports = router;
