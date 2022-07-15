const { initializeApp } = require('./src/app/app');

const start = () => {
  const { guestBookPath, port } = process.env;
  const config = {
    guestBookPath,
  };
  const sessionsStored = {};
  const users = {};

  const app = initializeApp(config, sessionsStored, users);
  app.listen(port, () => {
    console.log(`server bound to ${port}`);
  })
};

start();
