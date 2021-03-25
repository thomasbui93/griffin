import appSetup from "./app";
import logHelper from "./services/logging";

const log = logHelper.child({
  tag: "server",
});

const start = () => {
  appSetup()
    .then(async () => {
      const app = await appSetup();
      const port = process.env.PORT;
      app.listen(port, () => {
        log.info(`App is running in port ${port}`);
      });
    })
    .catch((err) => console.log(err));
};

start();
