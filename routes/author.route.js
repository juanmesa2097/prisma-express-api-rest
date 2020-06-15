const express = require("express");
const {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");
const router = express.Router();

router.route("/").get(getAuthors).post(createAuthor);
router.route("/:id").get(getAuthor).put(updateAuthor).delete(deleteAuthor);

module.exports = router;
