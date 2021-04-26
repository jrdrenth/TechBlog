const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require('../../utils/auth');

// Create
router.post("/", withAuth, async (req, res) => {
  try {

    //// TEMPORARY ////
    if (req.session.userId == null) {
      req.session.userId = 1;
    }

    const requestedPost = { ...req.body, user_id: req.session.userId };
    const newPost = await Post.create(requestedPost);
    res.status(200).json(newPost);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (post != null) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: `No post found with id: ${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read by user_id
router.get("/byuserid/:id", async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { user_id: req.params.id },
      order: [["id", "asc"]],
    });

    if (posts != null) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: `No posts found` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRowCount] = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (affectedRowCount > 0) {
      res.status(200).json(affectedRowCount);
    } else {
      res.status(404).json(affectedRowCount);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const isDeleted = await Post.destroy({ where: { id: req.params.id } });

    if (isDeleted != 0) {
      res.status(200).json(isDeleted);
    } else {
      res.status(404).json(isDeleted);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
