const express = require("express");
const { join } = require("path");

const app = express();

app.use(express.static(join(__dirname, "client", "build")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) =>
  res.sendFile(join(__dirname, "client", "build", "index.html"))
);

app.listen(process.env.PORT || 3001);
