const { Router } = require("express");
const {
  getPoemsByAuthor,
  getRandomPoemByAuthor,
} = require("../../../services/poem");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const poems = await getPoemsByAuthor(req.query.author, req.query.page);
    res.json(poems);
  } catch (err) {
    next(err);
  }
});

router.get("/random", async (req, res, next) => {
  try {
    const poem = await getRandomPoemByAuthor(req.query.author);
    res.json(poem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
