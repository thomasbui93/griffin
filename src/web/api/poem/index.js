const { Router } = require("express");
const logging = require("../../../services/logging").child("poem_api");
const {
  getPoemsByAuthor,
  getRandomPoemByAuthor,
} = require("../../../services/poem");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const [poems, isCached] = await getPoemsByAuthor(
      req.query.author,
      req.query.page
    );
    logging.info(
      `Requesting poems from ${req.query.author}, ${req.query.page} cached: ${isCached}`
    );
    res.json(poems);
  } catch (err) {
    next(err);
  }
});

router.get("/random", async (req, res, next) => {
  try {
    const [poem, isCached] = await getRandomPoemByAuthor(req.query.author);
    logging.info(
      `Requesting random poem from ${req.query.author} cached: ${isCached}`
    );
    res.json(poem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
