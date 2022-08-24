const path = require("path");
const express = require("express");
const app = express();
publicPath = path.join(__dirname, "..", "build");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is up!");
});
