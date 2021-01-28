const express = require("express");
const router = express.Router();

const Item = require("../models/item");

router.post("", (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Item({
    name: req.body.name,
    description: req.body.description,
    imageLink: req.body.imageLink,
    isDeleted: req.body.isDeleted,
    parentId: req.body.parentId,
    isFolder: req.body.isFolder
  });
  console.log(post)
  Item.create(
    {
      name: post.name,
      description: post.description,
      imageLink: post.imageLink,
      isDeleted: post.isDeleted,
      parentId: post.parentId,
      isFolder: post.isFolder
    }
  ).then(data => console.log(data)).catch(data => console.log(data))
});

router.get("", (req, res, next) => {
  Item.findAll()
    .then((items) => {
      res.status(200).json({
        message: "Items fetched successfully",
        items: items,
      });
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({ message: "Post deleted" });
  });
});

/* router.put("/:id", (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.title) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: "Update successful" });
  });
});
 */
router.get("/:id", (req, res, next) => {
  Item.findByPk(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

module.exports = router;
