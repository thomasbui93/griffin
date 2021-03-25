import { Router, Request, Response, NextFunction } from "express";
import {
  getPoemsByAuthor,
  getRandomPoemByAuthor,
} from "../../../services/poem";
import logHelper from "../../../services/logging";

const logging = logHelper.child("poem_api");
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
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

router.get(
  "/random",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [poem, isCached] = await getRandomPoemByAuthor(req.query.author);
      logging.info(
        `Requesting random poem from ${req.query.author} cached: ${isCached}`
      );
      res.json(poem);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
