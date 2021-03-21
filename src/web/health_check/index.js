const { Router } = require("express");
const redis = require("../../helpers/redis");
const { healthCheck } = require("../../services/cache/mem");

const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const pong = await redis.ping();
    const memeCache = await healthCheck();

    res.json({
      status: "ok",
      redis: pong === "PONG" ? "ok" : "failed",
      memcache: memeCache ? "ok" : "failed",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
