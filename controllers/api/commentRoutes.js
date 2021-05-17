const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require('../../utils/auth');

// Create
router.post("/", withAuth, async (req, res) => {
  try {

    //// TEMPORARY ////
    // if (req.session.userId == null) {
    //   req.session.userId = 1;
    // }

    const requestedComment = { ...req.body, user_id: req.session.userId };
    const newComment = await Comment.create(requestedComment);
    res.status(200).json(newComment);

  } catch (err) {
    res.status(500).json(err);
  }
});

// Read all
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read by id
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (comment != null) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({
        message: `No comment found with id: ${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Read by user_id
router.get("/byuserid/:id", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { user_id: req.params.id },
      order: [["id", "asc"]],
    });

    if (comments != null) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: `No comments found` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRowCount] = await Comment.update(req.body, {
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
    const isDeleted = await Comment.destroy({ where: { id: req.params.id } });

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
