import healthCheck from "./health_check";
import poem from "./api/poem";

export default (app) => {
  app.use("/z/check", healthCheck);
  app.use("/api/poem", poem);
};
