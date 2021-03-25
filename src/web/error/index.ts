import { Request, Response, NextFunction } from "express";
import logHelper from "../../services/logging";
const log = logHelper.child({
  tag: "uncaught-exception",
});

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  log.error("Uncaught exception", {
    request: req.url,
    method: req.method,
    body: req.body,
    stack: err.stack,
  });
  console.log(err);

  res.status(500);
  return res.send({
    error: true,
    message: err.message,
  });
};
