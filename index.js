const express = require("express");
const { route } = require("./Routes/routes");

const app = express();

app.use("/api/v1", route);

app.listen(3000, () => {
  console.log("the server is running");
});
