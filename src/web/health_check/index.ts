import { Router, Request, Response, NextFunction } from "express";
import redis from "../../helpers/redis";
import { healthCheck } from "../../services/cache/mem";

const router = Router();
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
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

export default router;
