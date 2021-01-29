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
  Item.create(
    {
      name: post.name,
      description: post.description,
      imageLink: post.imageLink,
      isDeleted: post.isDeleted,
      parentId: post.parentId,
      isFolder: post.isFolder
    }
  ).then().catch()
});

router.get("", (req, res, next) => {
  Item.findAll()
    .then((items) => {
      res.status(200).json({
        message: "Items fetched successfully",
        items: items,
      });
    })
    .catch();
});

router.get("*", (req, res, next) => {
  Item.findAll()
    .then((items) => {
      res.status(200).json({
        message: "Items fetched successfully",
        items: items,
      });
    })
    .catch();
});

router.get("/:id", (req, res, next) => {
  Item.findByPk(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

router.post("/edit", (req, res, next) => {
  
  const id = req.body.id;
  const updatedName = req.body.name;
  const updatedIsDeleted = req.body.isDeleted;
  const updatedDescription = req.body.description;
  const updatedImageLink = req.body.imageLink;
  Item.findByPk(id).then(item => {
    item.name = updatedName;
    item.description = updatedDescription;
    item.isDeleted = updatedIsDeleted;
    item.imageLink = updatedImageLink;
    return item.save();
  }).then(result => {
  
  }).catch();
})

module.exports = router;
