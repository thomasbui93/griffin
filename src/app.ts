import * as express from "express";
import cors from "cors";
import { config } from "dotenv";
import errorHandler from "./web/error";
import notFoundHandler from "./web/error/404";
import router from "./web";

export default async () => {
  config();

  const app = express();
  app.use(cors());
  router(app);
  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
};
